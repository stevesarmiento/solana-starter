import { AccountNotificationsApi, Address, GetBalanceApi, Lamports, Rpc, RpcSubscriptions } from '@solana/web3.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const EXPLICIT_ABORT_TOKEN = Symbol();

/**
 * Custom hook to fetch and subscribe to account balance updates
 */
export function useBalance(
    rpc: Rpc<GetBalanceApi>,
    rpcSubscriptions: RpcSubscriptions<AccountNotificationsApi>,
    address: Address,
    chain: string
) {
    const queryClient = useQueryClient();
    const queryKey = ['balance', address.toString(), chain];

    return useQuery({
        queryKey,
        queryFn: async ({ signal }) => {
            let lastUpdateSlot = BigInt(-1);
            let latestLamports: Lamports | undefined;

            // Set up subscription first to not miss updates
            const subscriptionPromise = rpcSubscriptions
                .accountNotifications(address)
                .subscribe({ abortSignal: signal })
                .then(async accountInfoNotifications => {
                    try {
                        for await (const {
                            context: { slot },
                            value: { lamports },
                        } of accountInfoNotifications) {
                            if (slot > lastUpdateSlot) {
                                lastUpdateSlot = slot;
                                latestLamports = lamports;
                                // Update query data
                                queryClient.setQueryData(queryKey, lamports);
                            }
                        }
                    } catch (e) {
                        if (e !== EXPLICIT_ABORT_TOKEN) {
                            throw e;
                        }
                    }
                });

            // Get initial balance
            const { context: { slot }, value: lamports } = await rpc
                .getBalance(address, { commitment: 'confirmed' })
                .send({ abortSignal: signal });

            if (slot > lastUpdateSlot) {
                lastUpdateSlot = slot;
                latestLamports = lamports;
            }

            // Cleanup subscription on abort
            signal.addEventListener('abort', () => {
                subscriptionPromise.catch(() => {});
            });

            return latestLamports ?? lamports;
        },
        staleTime: Infinity, // Keep data fresh indefinitely since we're using subscriptions
        refetchOnWindowFocus: false, // Disable automatic refetching since we're using subscriptions
        refetchOnReconnect: false,
    });
}
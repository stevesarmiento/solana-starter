"use client";

import { useSolanaChain, useSolanaRpc } from '@/solana';
import { IconExclamationmarkTriangle } from 'symbols-react';
import { address } from '@solana/web3.js';
import type { UiWalletAccount } from '@wallet-standard/react';

import { getWalletErrorMessage } from './wallet/get-wallet-error-message';
import { useBalance } from '../functions/balance';
import { WalletErrorDialog } from './wallet/wallet-error-dialog';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Props = Readonly<{
    account: UiWalletAccount;
}>;

export function Balance({ account }: Props) {
    const { chain } = useSolanaChain();
    const { rpc, rpcSubscriptions } = useSolanaRpc();
    const { data: lamports, error, isLoading } = useBalance(
        rpc,
        rpcSubscriptions,
        address(account.address),
        chain.chain
    );

    if (error) {
        return (
            <>
                <WalletErrorDialog
                    error={error}
                    key={`${account.address}:${chain.chain}`}
                    onClose={() => {}}
                    title="Failed to fetch account balance"
                />
                <HoverCard>
                    <HoverCardTrigger>
                        <IconExclamationmarkTriangle
                            className="h-4 w-4 fill-destructive"
                        />
                    </HoverCardTrigger>
                    <HoverCardContent>
                        Could not fetch balance: {getWalletErrorMessage(error, 'Unknown reason')}
                    </HoverCardContent>
                </HoverCard>
            </>
        );
    } else if (isLoading || lamports == null) {
        return <span className="text-muted-foreground font-mono">&ndash;</span>;
    } else {
        const formattedSolValue = new Intl.NumberFormat(undefined, { maximumFractionDigits: 5 }).format(
            // @ts-expect-error This format string is 100% allowed now.
            `${lamports}E-9`,
        );
        return <span className="text-foreground/60 font-mono text-xl">{`${formattedSolValue}`}</span>;
    }
}
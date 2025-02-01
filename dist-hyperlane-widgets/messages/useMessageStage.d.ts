import type { MultiProvider } from '@hyperlane-xyz/sdk';
import { PartialMessage, MessageStage as Stage, StageTimings } from './types.js';
interface Params {
    message: PartialMessage | null | undefined;
    multiProvider: MultiProvider;
    explorerApiUrl?: string;
    retryInterval?: number;
}
export declare function useMessageStage({ message, multiProvider, explorerApiUrl, retryInterval, }: Params): {
    stage: Stage;
    timings: StageTimings;
    isLoading: boolean;
    error: string | null;
};
export {};
//# sourceMappingURL=useMessageStage.d.ts.map
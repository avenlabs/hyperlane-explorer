import { useMessage } from './useMessage.js';
import { useMessageStage } from './useMessageStage.js';
export function useMessageTimeline(params) {
    const { data: message, error: msgError, isLoading: isMsgLoading, } = useMessage(params);
    const { stage, timings, error: stageError, isLoading: isStageLoading, } = useMessageStage({
        message,
        multiProvider: params.multiProvider,
        retryInterval: params.retryInterval,
    });
    return {
        message,
        stage,
        timings,
        error: msgError || stageError,
        isLoading: isMsgLoading || isStageLoading,
    };
}
//# sourceMappingURL=useMessageTimeline.js.map
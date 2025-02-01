// TODO DE-DUPE WITH EXPLORER
// Mostly copied from explorer src/types.ts
export var MessageStatus;
(function (MessageStatus) {
    MessageStatus["Unknown"] = "unknown";
    MessageStatus["Pending"] = "pending";
    MessageStatus["Delivered"] = "delivered";
    MessageStatus["Failing"] = "failing";
})(MessageStatus || (MessageStatus = {}));
export var MessageStage;
(function (MessageStage) {
    MessageStage[MessageStage["Preparing"] = 0] = "Preparing";
    MessageStage[MessageStage["Sent"] = 1] = "Sent";
    MessageStage[MessageStage["Finalized"] = 2] = "Finalized";
    MessageStage[MessageStage["Validated"] = 3] = "Validated";
    MessageStage[MessageStage["Relayed"] = 4] = "Relayed";
})(MessageStage || (MessageStage = {}));
//# sourceMappingURL=types.js.map
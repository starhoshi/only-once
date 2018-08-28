"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let firestore;
exports.initialize = (_firestore) => {
    firestore = _firestore;
};
exports.path = '/event';
function wasTriggered(eventID) {
    return __awaiter(this, void 0, void 0, function* () {
        return firestore.runTransaction((t) => __awaiter(this, void 0, void 0, function* () {
            const ref = firestore.collection(exports.path).doc(eventID);
            const doc = yield t.get(ref);
            if (doc.exists) {
                return true;
            }
            else {
                t.create(ref, { createdAt: new Date(), updatedAt: new Date() });
                return false;
            }
        }));
    });
}
exports.wasTriggered = wasTriggered;

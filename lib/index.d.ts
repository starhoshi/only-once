import * as FirebaseFirestore from '@google-cloud/firestore';
/**
 * You have to call `OnlyOnce.initialize(admin.firestore()) after admin.initializeApp().`
 * @param _firestore admin.firestore()
 */
export declare const initialize: (_firestore: FirebaseFirestore.Firestore) => void;
export declare const path = "/eventtrigger";
export interface EventTrigger {
    createdAt: Date;
    updatedAt: Date;
}
/**
 * return true if eventID was already triggred.
 * @param eventID string
 */
export declare function wasTriggered(eventID: string): Promise<boolean>;

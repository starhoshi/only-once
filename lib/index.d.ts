import * as FirebaseFirestore from '@google-cloud/firestore';
export declare const initialize: (_firestore: FirebaseFirestore.Firestore) => void;
export declare const path = "/eventtrigger";
export interface EventTrigger {
    createdAt: Date;
    updatedAt: Date;
}
export declare function wasTriggered(eventID: string): Promise<boolean>;

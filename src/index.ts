import * as FirebaseFirestore from '@google-cloud/firestore'

let firestore: FirebaseFirestore.Firestore
/**
 * You have to call `OnlyOnce.initialize(admin.firestore()) after admin.initializeApp().`
 * @param _firestore admin.firestore()
 */
export const initialize = (_firestore: FirebaseFirestore.Firestore) => {
  firestore = _firestore
}

export const path = '/eventtrigger'
export interface EventTrigger {
  createdAt: Date,
  updatedAt: Date
}

/**
 * return true if eventID was already triggred.
 * @param eventID string
 */
export async function wasTriggered(eventID: string): Promise<boolean> {
  return firestore.runTransaction(async t => {
    const ref = firestore.collection(path).doc(eventID)
    const doc = await t.get(ref)
    if (doc.exists) {
      return true
    } else {
      t.create(ref, <EventTrigger>{ createdAt: new Date(), updatedAt: new Date() })
      return false
    }
  })
}

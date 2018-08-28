import * as FirebaseFirestore from '@google-cloud/firestore'

let firestore: FirebaseFirestore.Firestore
export const initialize = (_firestore: FirebaseFirestore.Firestore) => {
  firestore = _firestore
}

export const path = '/event'
export interface EventTrigger {
  createdAt: Date,
  updatedAt: Date
}

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

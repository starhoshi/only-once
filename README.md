# only-once

Prevent duplicate execution of Cloud Functions.  
You should read this blog. [firestore cloud functions onCreate/onDelete sometimes immediately triggered twice](https://medium.com/@hajimenakamura/firestore-cloud-functions-oncreate-ondelete-sometimes-immediately-triggered-twice-5ecf7eaa9fb2)


# Installation

```
npm install @star__hoshi/only-once --save
yarn add @star__hoshi/only-once
```

## Usage

```ts
import * as OnlyOnce from '@star__hoshi/only-once'

OnlyOnce.initialize(admin.firestore())

export const updateUser = functions.firestore.document('user/{userId}').onCreate(async (change, context) => {
  const wasTriggered = await OnlyOnce.wasTriggered(context.eventId)
  if (wasTriggered) {
    console.log(`EventID: ${context.eventId} was already triggered!`)
    return undefined
  }

  // exec only once

  return undefined
})
```

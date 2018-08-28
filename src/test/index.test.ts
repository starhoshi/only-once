import * as admin from 'firebase-admin'
import * as OnlyOnce from '../index'
import 'jest'

describe('wasTriggered', () => {
  jest.setTimeout(10000)

  beforeAll(() => {
    const serviceAccount = require('../../adminsdk.json')
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    OnlyOnce.initialize(admin.firestore())
  })

  let eventID: string
  beforeEach(() => {
    eventID = Math.random().toString(36).slice(-8)
  })

  describe('when triggered only once', () => {
    test('return false', () => {
      return expect(OnlyOnce.wasTriggered(eventID)).resolves.toBe(false)
    })
  })

  describe('when triggered twice', () => {
    beforeEach(async () => {
      await OnlyOnce.wasTriggered(eventID)
    })
    test('return true', () => {
      return expect(OnlyOnce.wasTriggered(eventID)).resolves.toBe(true)
    })
  })

  describe('when triggered a lot of times', () => {
    let promises: Promise<boolean>[] = []
    beforeEach(() => {
      [...Array(5)].map(() => promises.push(OnlyOnce.wasTriggered(eventID)))
    })
    test('return true', async () => {
      const result = await Promise.all(promises)
      expect(result.filter(value => !value).length).toBe(1)
      expect(result.filter(value => value).length).toBe(4)
    })
  })
})

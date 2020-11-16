const {JDSOM} = require('jsdom')
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import store, {resetStore} from '../client/store'
import waitForExpect from 'wait-for-expect'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chainEnzyme from 'chain-enzyme'

Enzyme.configure({adapter: new Adapter()})

chai.use(sinonChai)
chai.use(chainEnzyme())

store.nextDispatch = () => {
  return new Promise(resolve => {
    const unsubscribe = store.subscribe(() => {
      resolve()
      unsubscribe()
    })
  })
}
beforeEach(() => {
  store.dispatch(resetStore())
})

waitForExpect.defaults.timeout = 10
waitForExpect.defaults.interval = 5

const jsdom = new JDSOM('<!doctype html><html><body></body></html>')
const {window} = jsdom

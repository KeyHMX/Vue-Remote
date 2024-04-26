import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeCounterActions(newCounter: number) {
      //不允许隐式any 可以在tsconfig设置 也可以像这样声明
      this.counter = newCounter
    }
  }
})

export default useCounterStore

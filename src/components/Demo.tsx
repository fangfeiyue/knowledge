// import { defineComponent } from 'vue'
// export default defineComponent({
//   name: 'demo',
//   setup() {
//     return () => <div>hello demo</div>
//   }
// })

const demo = function(props:any) {
  const { name, age } = props
  return <div>name: {name}, age: {age}</div>
}
export default demo

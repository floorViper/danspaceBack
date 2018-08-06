<template>
<div>
  <full-calendar :events="events" :config="config"></full-calendar>  
  <a @click="mo">moment</a>
</div>
</template>

<script>
import moment from 'moment'
//import { FullCalendar } from 'vue-full-calendar'
export default {
  data() {
    return {
      events: [
        {
          //businessHours: true,
          title: '개인연습',
          start: '2018-07-10T08:00', // 8am
          end: '2018-07-10T16:00', // 6pm
          allDay: false,
        },
        {
          title: 'event2',
          start: '2018-07-10',
          end: '2018-07-12',
        },
        {
          title: 'event3',
          start: '2018-07-15T12:30:00',
          allDay: false,
        },
      ],
      config: {
        locale: 'ko',
        // businessHours: [
        //   // specify an array instead
        //   {
        //     dow: [1, 2, 3], // Monday, Tuesday, Wednesday
        //     start: '08:00', // 8am
        //     end: '18:00', // 6pm
        //   },
        //   {
        //     dow: [4, 5], // Thursday, Friday
        //     start: '10:00', // 10am
        //     end: '16:00', // 4pm
        //   },
        // ],
      },
    }
  },
  methods: {
    mo() {
      var noTime = moment('2014-05-01')
      var local = moment('2014-05-01T12:00:00')
      var utc = moment.utc('2014-05-01T12:00:00')
      var noTZ = moment.parseZone('2014-05-01T12:00:00')
      console.log(noTime, local, utc, noTZ)
    },
  },
  components: {
    //FullCalendar,
  },
}
</script>

<style>
</style>

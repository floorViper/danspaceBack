<template>
  <div class="">
    <form class="">
      <div class="">
        <label for="addrSearch">주소검색</label>
        <a id="addrSearch" class="waves-effect waves-light btn addr-search-btn" @click="setAddr">button</a>
      </div>
      <div class="">
        <label for="addrSearch">우편번호</label>
        <input type="text" id="postcode" name="postcode" placeholder="우편번호" v-model="postCode">
      </div>
      <div class="">
        <label for="addrSearch">주소</label>
        <input type="text" id="addr" name="addr" placeholder="주소" v-model="addr">
        <label for="addr2">상세 주소</label>
        <input type="text" id="addr2" name="addr2" placeholder="동, 호" v-model="addr2">
      </div>
      <div class="map" ref="map"></div>
      <div>
        <a @click="addTime"><i class="material-icons">add</i></a> <span>이용 가능시간 추가</span>
      </div>
      <vue-ctk-date-time-picker id="timepicker" format="H:mm" formatted="h:mm a" :time-format="timeFormat" v-model="timeAvailable[0].start" label="Choose time" :minute-interval="minuteInterval2" disable-date />
      <vue-ctk-date-time-picker id="timepicker" format="H:mm" formatted="h:mm a" :time-format="timeFormat" v-model="timeAvailable[0].end" label="Choose time" :minute-interval="minuteInterval2" disable-date />

    
    </form>
  </div>
</template>
<script>

export default {
  components: {
  },
  data() {
    return {
      addr: '',
      addr2: '',
      postCode: '',
      timeAvailable: [{ start: '00:00', end: '23:59' }],
      minuteInterval: 10,
      timePickerValue: '12:00',
      minuteInterval: 5,
      minuteInterval2: 30,
      timeFormat: 'h:mm a',
      locale: 'fr',
    }
  },
  methods: {
    addTime() {
      this.timeAvailable.push
    },
    setAddr() {
      let self = this
      var mapContainer = this.$refs.map, // 지도를 표시할 div
        mapOption = {
          center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
        }

      //지도를 미리 생성
      // var map = new daum.maps.Map(mapContainer, mapOption)
      // //주소-좌표 변환 객체를 생성
      // var geocoder = new daum.maps.services.Geocoder()
      // //마커를 미리 생성
      // var marker = new daum.maps.Marker({
      //   position: new daum.maps.LatLng(37.537187, 127.005476),
      //   map: map,
      // })
      new daum.Postcode({
        oncomplete(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          console.log('addrdata::', data)
          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var fullAddr = '' // 최종 주소 변수
          var extraAddr = '' // 조합형 주소 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress
          }

          // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
          if (data.userSelectedType === 'R') {
            //법정동명이 있을 경우 추가한다.
            if (data.bname !== '') {
              extraAddr += data.bname
            }
            // 건물명이 있을 경우 추가한다.
            if (data.buildingName !== '') {
              extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            fullAddr += extraAddr !== '' ? ' (' + extraAddr + ')' : ''
          }
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          self.postCode = data.zonecode //5자리 새우편번호 사용
          self.addr = fullAddr
          // 커서를 상세주소 필드로 이동한다.
          //document.getElementById('sample6_address2').focus()

          var map = new daum.maps.Map(mapContainer, mapOption)
          //주소-좌표 변환 객체를 생성
          var geocoder = new daum.maps.services.Geocoder()
          //마커를 미리 생성
          var marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(37.537187, 127.005476),
            map: map,
          })
          geocoder.addressSearch(data.address, function(results, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === daum.maps.services.Status.OK) {
              var result = results[0] //첫번째 결과의 값을 활용

              // 해당 주소에 대한 좌표를 받아서
              var coords = new daum.maps.LatLng(result.y, result.x)
              // 지도를 보여준다.
              mapContainer.style.display = 'block'
              map.relayout()
              // 지도 중심을 변경한다.
              map.setCenter(coords)
              // 마커를 결과값으로 받은 위치로 옮긴다.
              marker.setPosition(coords)
            }
          })
        },
      }).open()
    },
  },
}
</script>
<style>
.rent-header {
  text-align: right;
}
.rent-item {
  display: inline-block;
  width: 200px;
}
.rent-register btn {
  display: inline-block;
}
[id='addrSearch'] + label {
  width: 50%;
  display: inline-block;
}
.map {
  width: 500px;
  height: 400px;
  background-color: skyblue;
}
.time-select1,
.tiem-select2 {
  width: 50%;
}
</style>

<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <th class="th-check-all" v-if="showCheck">
          <Checkbox @change="checkAll($event)" :checked="checkAllChecked"/>
        </th>
        <th
          v-for="{ text, classes, propName, width } in headers"
          :key="propName"
          :class="classes"
          :style="{ minWidth: `${width}px` }"
        >
          {{ text }}
        </th>
        <th v-if="showAction" class="td-actions">chức năng</th>
      </thead>
      <tbody>
        <tr v-for="item in computedItems" :key="item[keyName]" @dblclick="$emit('selectedRow',item)">
          <td class="td-check" v-if="showCheck">
            <Checkbox :checked="isChecked(item)" :value="item[keyName]" :item="item" @addSelectedItem="addEmployeeSelected(item[keyName])" @removeSelectedItem="removeEmployeeSelected(item[keyName])"/>
          </td>
          <td
            v-for="{ propName, classes, width } in headers"
            :key="propName"
            :class="classes"
            :style="{ minWidth: `${width}px` }"
          >
            {{ item[propName] }}
          </td>
          <td v-if="showAction" class="td-actions">
            <div class="actions">
              <slot name="actions" :item="item" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Checkbox from "./Checkbox.vue";
import FormatData from '../../js/FormatData'
export default {
  components: {
    Checkbox,
  },
  props: {
    //header của table
    headers: {
      type: Array,
      required: true,
    },

    //dữ liệu của table
    items: {
      type: Array,
      default: () => [],
    },

    //khóa chính của item
    keyName: {
      type: String,
      required: true,
    },
    showAction: Boolean,

    //danh sách các item được chọn
    selectedIds: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    /*Lấy ra các item được chọn
     * author:LAĐức(09/02/2022)
     */
    isChecked(item){
      return this.selectedEmployeesIds.find(i=> i==item[this.keyName]);
    },

    /*check tất cả các bản ghi đang hiển thị nếu check vào header
     * author:LAĐức(09/02/2022)
     */
    checkAll(evt) {
      if (evt.target.checked) {
        this.selectedEmployeesIds = this.items.map((item) => item[this.keyName]);
        this.$emit('updateSelectedIds',this.selectedEmployeesIds);
      } else {
        this.selectedEmployeesIds = [];
      }
    },

    /*thêm item được select vào danh sách khi được chọn
     * author:LAĐức(09/02/2022)
     */
    addEmployeeSelected(item){
      this.selectedEmployeesIds.push(item);
      this.$emit('updateSelectedIds',this.selectedEmployeesIds);
    },

    /*gỡ item khỏi danh sách chọn nếu item bị bỏ chọn
     * author:LAĐức(09/02/2022)
     */
    removeEmployeeSelected(item){
      const itemIndex =this.selectedEmployeesIds.indexOf(item);
      if(itemIndex>-1){
        this.selectedEmployeesIds.splice(itemIndex,1);
      }
      this.$emit('updateSelectedIds',this.selectedEmployeesIds);
    },
    
    /*thiết lập lại danh sách chọn item
     * author:LAĐức(09/02/2022)
     */
    setEmptyArray(){
      this.selectedEmployeesIds=[];
  },
  },
  computed: {
    /*cập nhật lại dữ liệu của danh sách item sau khi format dữ liệu
     * author:LAĐức(09/02/2022)
     */
    computedItems() {
      return this.items.map((item) => {
        const newItem = { ...item };
        for (const { propName, format } of this.headers) {
          switch (format) {
            case "date":
              newItem[propName] =FormatData.formatDate(newItem[propName]);
              break;
            case "gender":
              newItem[propName] = FormatData.formatGender(newItem[propName]);
          }
        }
        return newItem;
      });
    },
    //kiểm tra xem tất cả ô checkbox đã được check hay chưa
    checkAllChecked() {
      if (this.selectedEmployeesIds.length == this.items.length) return true;
      return false;
    },
    //có hiển thị cột checkbox hay không
    showCheck() {
      return this.items.length > 0 && this.headers.length > 0;
    },
  },
  
  data(){
    return{
          selectedEmployeesIds:[],
    }
  }
};
</script>
<style scoped src="../../style/component/table.css"></style>
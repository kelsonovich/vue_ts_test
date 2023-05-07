<template>
  <n-data-table
      :columns="columns"
      :data="data"
      :row-key="rowKey"
  />
</template>

<script lang="ts">
import {defineComponent, ref, h} from 'vue'
import Device from "@/types/Device";
import TestDataService from "@/service/TestDataService"
import ResponseData from "@/types/ResponseData";
import {NSwitch, NInput, NDatePicker} from "naive-ui";
import type {DataTableColumns} from "naive-ui";

export default defineComponent({
  setup () {
    const getPrice = (priceNoVat: string, vat: string): number => {
      return Number((Number(priceNoVat) * (1 + (Number(vat) / 100))).toFixed(2));
    };

    const data = ref<Device[]>([]);
    const fetchData = () => {
      TestDataService.getAll().then(
          (response: ResponseData) => {
            data.value = response.data;
          }
      )
    };
    fetchData();

    const createColumns = (): DataTableColumns<Device> => [
      {
        type: 'expand',
        expandable: (rowData) => rowData.isActual,
        renderExpand: (rowData) => {
          const params = rowData.params;

          return h(
              'table',
              {class: 'n-data-table-table'},
              [
                  h(
                      'thead',
                      {class: 'n-data-table-thead'},
                      [
                          h(
                              'tr',
                              {class: 'n-data-table-tr'},
                              [
                                h('th', {class: 'n-data-table-th'}, 'Длина'),
                                h('th', {class: 'n-data-table-th'}, 'Высота'),
                                h('th', {class: 'n-data-table-th'}, 'Ширина'),
                                h('th', {class: 'n-data-table-th'}, 'Масса'),
                                h('th', {class: 'n-data-table-th'}, 'Объем'),
                                h('th', {class: 'n-data-table-th'}, 'Материалы'),
                              ]
                          ),
                      ]
                  ),
                  h(
                      'tbody',
                      {class: 'n-data-table-tbody'},
                      [
                        h(
                            'tr',
                            {class: 'n-data-table-tr'},
                            [
                              h('td', {class: 'n-data-table-td'}, params?.length),
                              h('td', {class: 'n-data-table-td'}, params?.height),
                              h('td', {class: 'n-data-table-td'}, params?.width),
                              h('td', {class: 'n-data-table-td'}, params?.weight),
                              h('td', {class: 'n-data-table-td'}, params?.volume),
                            ]
                        )
                      ]
                  )
              ]
          );
        }
      },
      {
        title: 'Наименование CTЕ',
        key: 'name'
      },
      {
        title: 'В наличии',
        key: 'isActual',
        render (row, index) {
          return h(NSwitch, {
            value: row.isActual,
            onUpdateValue(v) {
              data.value[index].isActual = v
            }
          });
        }
      },
      {
        title: 'Срок действия предоставленных сведений',
        key: 'endDate',
        render (row, index) {
          return h(NDatePicker, {
            placeholder: 'Выберите дату',
            format: 'dd.MM.yyyy',
            disabled: !row.isActual,
            value: row.endDate,
            onUpdateValue(v: number) {
              data.value[index].endDate = v
            }
          });
        }
      },
      {
        title: 'Цена, руб. без НДС',
        key: 'priceNoVat',
        render (row, index) {
          return h(NInput, {
            placeholder: 'Введите цену',
            disabled: !row.isActual,
            value: String(row.priceNoVat),
            onUpdateValue(v: string) {
              data.value[index].priceNoVat = Number(v);

              data.value[index].price = getPrice(String(data.value[index].priceNoVat), String(data.value[index].vat));
            }
          });
        }
      },
      {
        title: 'НДС, %',
        key: 'vat',
        render (row, index) {
          return h(NInput, {
            placeholder: 'Введите НДС',
            disabled: !row.isActual,
            value: String(row.vat),
            onUpdateValue(v: string) {
              data.value[index].vat = Number(v);

              data.value[index].price = getPrice(String(data.value[index].priceNoVat), String(data.value[index].vat));
            }
          });
        }
      },
      {
        title: 'Цена, руб. с НДС',
        key: 'price',
      },
      {
        title: 'Срок заполнения',
        key: 'fillEndDate',
        render (row) {
          return h(NDatePicker, {
            disabled: true,
            value: row.fillEndDate,
            format: 'dd.MM.yyyy',
          });
        }
      }
    ];

    return {
      data,
      rowKey: (row: Device) => row.id,
      columns: createColumns(),
    }
  }
});
</script>

<style scoped>

</style>
<template>
  <n-data-table
    remote
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :loading="loading"
    :bordered="true"
  ></n-data-table>
</template>

<script>
import { h, defineComponent } from "vue";
import { NButton, NDataTable } from "naive-ui";

const createColumns = ({ play }) => {
  return [
    {
      title: "Id",
      key: "id",
    },
    {
      title: "Nome",
      key: "nome",
    },
    {
      title: "Idade",
      key: "idade",
    },
    {
      title: "Action",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row),
          },
          { default: () => "Play" }
        );
      },
    },
  ];
};

const data = [
  { id: 3, nome: "Wonderwall", idade: 4 },
  { id: 4, nome: "Don't Look Back in Anger", idade: 4 },
  { id: 12, nome: "Champagne Supernova", idade: 7 },
];

export default defineComponent({
  components: {
    NDataTable,
  },
  setup() {
    return {
      data,
      columns: createColumns({
        play(row) {
          console.log(`Play ${row.nome}`);
        },
      }),
      pagination: false,
    };
  },
});
</script>

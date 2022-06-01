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
import Api from "../provider/api.provider";

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

const data = [];
Api.get("/pessoas")
  .then((response) => {
    response.data.forEach((dataResponse) => {
      data.push(dataResponse);
    });
  })
  .catch((e) => console.error(e.message));

console.log(data);
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

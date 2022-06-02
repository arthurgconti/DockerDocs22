<template>
  <n-space id="container">
    <n-data-table
      remote
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :loading="loading"
      :bordered="false"
      class="dataTable"
    ></n-data-table>
    <n-button circle @click="addPerson">
      <template #icon>
        <n-icon><plus-icon /></n-icon>
      </template>
    </n-button>
  </n-space>
</template>

<script>
import { h, defineComponent, ref, onMounted } from "vue";
import { NButton, NDataTable, NIcon } from "naive-ui";
import { Add12Filled as PlusIcon } from "@vicons/fluent";
import Api from "../provider/api.provider";
import Swal from "sweetalert2";

const dataRef = ref([]);
const loadingRef = ref(true);

const createColumns = () => {
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
      title: "",
      key: "delete",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            primary: true,
            color: "red",
            size: "small",
            onClick: () => {
              Api.delete(`/pessoa/${parseInt(row.id)}`)
                .then(() => {
                  Api.get("/pessoas")
                    .then((response) => {
                      dataRef.value = response.data;
                    })
                    .catch((e) => console.error(e.message));
                  Swal.fire(
                    "Sucesso",
                    `Usuario ${row.nome} foi deletado com sucesso`,
                    "success"
                  );
                })
                .catch((e) => console.error(e.message));
            },
          },
          { default: () => "Deletar" }
        );
      },
    },
  ];
};

export default defineComponent({
  components: {
    NDataTable,
    PlusIcon,
    NButton,
    NIcon,
  },
  methods: {
    async addPerson() {
      const { value: formValues } = await Swal.fire({
        title: "Cadastrar usuário",
        html:
          '<input id="nome" placeholder="Nome" class="swal2-input">' +
          '<input id="idade" placeholder="Idade" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return {
            nome: document.getElementById("nome").value,
            idade: parseInt(document.getElementById("idade").value),
          };
        },
      });

      if (formValues) {
        loadingRef.value = true;
        Api.post("/pessoa", formValues)
          .then((response) => {
            Api.get("/pessoas")
              .then((response) => {
                dataRef.value = response.data;
              })
              .catch((e) => console.error(e.message))
              .finally(() => {
                loadingRef.value = false;
                Swal.fire(
                  `${response.data.message}`,
                  "Usuário cadastrado com sucesso",
                  "success"
                );
              });
          })
          .catch((e) => {
            console.error(e.message);
          });
      }
    },
  },
  setup() {
    onMounted(() => {
      loadingRef.value = true;
      Api.get("/pessoas")
        .then((response) => {
          dataRef.value = response.data;
        })
        .catch((e) => console.error(e.message))
        .finally(() => {
          loadingRef.value = false;
        });
    });

    return {
      data: dataRef,
      loading: loadingRef,
      columns: createColumns({}),
      pagination: false,
    };
  },
});
</script>

<style scoped>
#container {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dataTable {
  width: 70%;
  height: 70%;
}
</style>

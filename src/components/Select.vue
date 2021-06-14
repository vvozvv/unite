<template>
  <div class="v-select" :class="{ 'is-active': isActive }">
    <div class="vs-box" :class="{ 'has-text-grey': !name }" @click="toggleMenu">
      {{ name || placeholder }}
    </div>
    <div class="vs-menu-container">
      <div class="vs-search">
        <input
          type="text"
          class="input vs-search"
          v-model="q"
          placeholder="Поиск..."
          ref="vSelectInput"
        />
      </div>
      <ul class="vs-items">
        <li class="vs-item">
          <span @click.prevent="setItem({ id: null, name: 'Без папки' })">Без папки</span>
        </li>
        <li class="vs-item" v-for="(item, index) in filteredItems" :key="index">
          <span @click.prevent="setItem(item)">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    selectValue: Number,
  },
  data() {
    return {
      isActive: false,
      value: null,
      name: null,
      q: '',
      items: [],
    }
  },
  mounted() {
    this.$store.dispatch('folder/getFolder')
  },
  computed: {
    ...mapGetters({ folders: 'folder/folders' }),
    filteredItems() {
      if (this.q.trim().length === 0) {
        return this.folders
      }
      return this.folders.filter(
        (item) => item.name.toLowerCase().indexOf(this.q.toLowerCase()) > -1
      )
    },
    placeholder() {
      return 'Выберите папку'
    },
    selectedFolder() {
      return this.selectValue
    },
  },
  methods: {
    setItem(item) {
      this.name = item.name
      this.value = item.id
      this.isActive = false
      console.log(item.name)
      this.$emit('input', item.id)
    },
    toggleMenu() {
      this.isActive = !this.isActive
      this.$nextTick(() => {
        this.$refs.vSelectInput.select()
      })
    },
    getCurrentFolder(value) {
      let selectedItem = this.folders.find((item) => item.id === value)
      selectedItem = JSON.parse(JSON.stringify(selectedItem))
      this.name = selectedItem.name
      this.value = selectedItem.value
      return selectedItem
    },
  },
}
</script>

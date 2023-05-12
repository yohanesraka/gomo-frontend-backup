<template>
  <component :is="layoutComponent">
    <template #nav>
      <div class="nav-wrapper">
        <ul
          class="nav"
          role="tablist"
          :class="[
            type ? `nav-pills-${type}` : '',
            pills ? 'nav-pills' : 'nav-tabs',
            { 'nav-pills-icons': icons },
            { 'nav-fill': fill },
            { 'nav-pills-circle': circle },
            { 'justify-content-center': centered },
            tabNavClasses,
          ]"
        >
          <li v-for="tab in tabs" :key="tab.id || tab.title" class="nav-item">
            <a
              data-toggle="tab"
              role="tab"
              class="nav-link"
              :href="`#${tab.id || tab.title}`"
              :aria-selected="tab.active"
              :class="{ active: tab.active }"
              @click.prevent="activateTab(tab)"
            >
              <i v-if="tab.icon" :class="tab.icon"></i>
              <tab-item-content :tab="tab"> </tab-item-content>
            </a>
          </li>
        </ul>
      </div>
    </template>
    <template #content>
      <div class="tab-content" :class="[tabContentClasses]">
        <slot v-bind="slotData"></slot>
      </div>
    </template>
  </component>
</template>

<script>
import { h } from "vue";

import PillsLayout from "./PillsLayout.vue";
import TabsLayout from "./TabsLayout.vue";

export default {
  name: "TabsComp",
  components: {
    TabsLayout,
    PillsLayout,
    TabItemContent: {
      props: ["tab"],
      render() {
        return h("div", [this.tab.$slots.title || this.tab.title]);
      },
    },
  },
  provide() {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab,
    };
  },
  props: {
    type: {
      type: String,
      default: "",
      validator: (value) => {
        const acceptedValues = [
          "",
          "primary",
          "info",
          "success",
          "warning",
          "danger",
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: "Tabs type (primary|info|danger|default|warning|success)",
    },
    pills: {
      type: Boolean,
      default: true,
      description: "Whether tabs are pills",
    },
    circle: {
      type: Boolean,
      default: false,
      description: "Whether tabs are circle",
    },
    fill: {
      type: Boolean,
      default: true,
      description: "Whether to fill each tab",
    },
    activeTab: {
      type: String,
      default: "",
      description: "Default active tab name",
    },
    tabNavWrapperClasses: {
      type: [String, Object],
      default: "",
      description: "Tab Nav wrapper (div) css classes",
    },
    tabNavClasses: {
      type: [String, Object],
      default: "",
      description: "Tab Nav (ul) css classes",
    },
    tabContentClasses: {
      type: [String, Object],
      default: "",
      description: "Tab content css classes",
    },
    icons: {
      type: Boolean,
      description: "Whether tabs should be of icon type (small no text)",
    },
    centered: {
      type: Boolean,
      description: "Whether tabs are centered",
    },
    value: {
      type: String,
      description: "Initial value (active tab)",
      default: "",
    },
  },
  data() {
    return {
      tabs: [],
      activeTabIndex: 0,
    };
  },
  computed: {
    layoutComponent() {
      return this.pills ? "pills-layout" : "tabs-layout";
    },
    slotData() {
      return {
        activeTabIndex: this.activeTabIndex,
        tabs: this.tabs,
      };
    },
  },
  watch: {
    value(newVal) {
      this.findAndActivateTab(newVal);
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.value) {
        this.findAndActivateTab(this.value);
      } else if (this.tabs.length > 0) {
        this.activateTab(this.tabs[0]);
      }
    });
  },
  methods: {
    findAndActivateTab(title) {
      const tabToActivate = this.tabs.find((t) => t.title === title);
      if (tabToActivate) {
        this.activateTab(tabToActivate);
      }
    },
    activateTab(tab) {
      const ctx = tab;
      if (this.handleClick) {
        this.handleClick(tab);
      }
      this.deactivateTabs();
      ctx.active = true;
      this.activeTabIndex = this.tabs.findIndex((t) => t.active);
    },
    deactivateTabs() {
      this.tabs.forEach((tab) => {
        const ctx = tab;
        ctx.active = false;
      });
    },
    addTab(tab) {
      const ctx = tab;
      if (this.activeTab === ctx.name) {
        ctx.active = true;
      }
      this.tabs.push(tab);
    },
    removeTab(tab) {
      const { tabs } = this;
      const index = tabs.indexOf(tab);
      if (index > -1) {
        tabs.splice(index, 1);
      }
    },
  },
};
</script>

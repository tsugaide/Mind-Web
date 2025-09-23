<script setup>
import { ref, computed } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

const props = defineProps({
  label: String,
  hint: String,
  modelValue: String,
  type: {
    type: String,
    default: "text",
  },
});

const isPassword = computed(() => props.type === "password");
const showPassword = ref(false);

const inputType = computed(() => {
  if (!isPassword.value) return props.type;
  return showPassword.value ? "text" : "password";
});

const toggleVisibility = () => {
  showPassword.value = !showPassword.value;
};

const emit = defineEmits(["update:modelValue"]);
const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div>
    <div class="relative w-72 md:w-96">
      <div class="relative">
        <input
          :type="inputType"
          class="peer w-full border-b border-[#2b2b2b] bg-transparent focus:outline-none py-1 pt-4 pr-10 placeholder-transparent"
          :value="modelValue"
          @input="updateValue"
        />
        <label
          :class="{
            'top-0 text-xs -translate-y-0': modelValue,
            'top-1/2 -translate-y-1/2': !modelValue,
          }"
          class="absolute left-0 text-sm font-quattrocento text-[#2b2b2baf] transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:-translate-y-0"
        >
          {{ label }}
        </label>
        <button
          v-if="isPassword"
          type="button"
          class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#2b2b2b]"
          @click="toggleVisibility"
        >
          <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

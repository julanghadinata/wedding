<template>
    <div ref="loadingRef" 
        class="fixed top-0 left-0 right-0 bottom-0 z-[999] bg-[#1A1A1A] flex items-center justify-center p-5">
        <div class="flex flex-col gap-3 justify-center items-center text-white">
            <p class="font-subtitle uppercase tracking-widest">
                We Invite You To Celebrate
            </p>
            <p class="relative text-white font-title text-2xl xl:text-4xl text-center flex flex-col leading-[2rem] xl:leading-[3rem]">
                <span>
                    Julang Hadinata  
                </span>
                <span>
                    &
                </span>
                <span>
                    Shinta Dewi
                </span>
            </p>
            <p ref="percentRef" 
                class="font-subtitle text-xs font-medium text-bodydarkblue">
                0%
            </p>
            <span ref="lineRef" 
                class="bg-bodydarkblue h-5 w-0 block mt-4">
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import gsap from "gsap"

const loadingRef = ref<HTMLElement | null>(null)
const percentRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!loadingRef.value || !percentRef.value || !lineRef.value) return

  let percent = { value: 0 }

  const tl = gsap.timeline({
    onComplete: () => {
      // Fade out setelah progress selesai
      gsap.to(loadingRef.value, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          loadingRef.value?.remove()
        }
      })
    }
  })

  // Animate percent + line
  tl.to(percent, {
    value: 100,
    duration: 2.5, // lama loading
    ease: "linear",
    onUpdate: () => {
      if (percentRef.value && lineRef.value) {
        percentRef.value.textContent = `${Math.round(percent.value)}%`
        gsap.set(lineRef.value, { width: `${percent.value}%` })
      }
    }
  })
})
</script>

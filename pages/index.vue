<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { initSwiper } from "~/assets/js/swiper"
    const isClosed = ref(false)
    const copied = ref(false)

    //Target Waktu
    const targetDate = new Date("2026-10-08T16:00:00+08:00").getTime()

    const days = ref("00")
    const hours = ref("00")
    const minutes = ref("00")
    const seconds = ref("00")

    let timer

    const images = [
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-3.jpg",
        "https://swiperjs.com/demos/images/nature-4.jpg",
        "https://swiperjs.com/demos/images/nature-5.jpg",
        "https://swiperjs.com/demos/images/nature-6.jpg",
        "https://swiperjs.com/demos/images/nature-7.jpg",
        "https://swiperjs.com/demos/images/nature-8.jpg",
        "https://swiperjs.com/demos/images/nature-10.jpg",
    ]
    
    const snowContainer = ref(null)
    const snowCount = 80 // jumlah bintik salju

    const form = ref({
        nama: '',
        pesan: '',
        konfirmasi: 'Hadir'
    })

    const rsvpList = ref([
        { nama: 'Julsky', pesan: 'Selamat menempuh hidup baru Julang & Shinta, bahagia menyertai, Semoga bahagia selalu,Sukses selalu untuk kalian, bahagia menyertai, Semoga bahagia selalu,Sukses selalu untuk kalian', konfirmasi: 'Tidak Hadir' },
        { nama: 'Dika', pesan: 'Semoga bahagia selalu', konfirmasi: 'Hadir' },
        { nama: 'Rina', pesan: 'Sukses selalu untuk kalian', konfirmasi: 'Hadir' },
        { nama: 'Tina', pesan: 'Doa terbaik untuk kalian', konfirmasi: 'Akan Diusahakan Hadir' },
        { nama: 'Budi', pesan: 'Selamat berbahagia', konfirmasi: 'Hadir' },
        { nama: 'Rina', pesan: 'Sukses selalu untuk kalian', konfirmasi: 'Hadir' },
        { nama: 'Tina', pesan: 'Doa terbaik untuk kalian', konfirmasi: 'Akan Diusahakan Hadir' },
        { nama: 'Budi', pesan: 'Selamat berbahagia', konfirmasi: 'Hadir' },
        { nama: 'Rina', pesan: 'Sukses selalu untuk kalian', konfirmasi: 'Hadir' },
        { nama: 'Tina', pesan: 'Doa terbaik untuk kalian', konfirmasi: 'Akan Diusahakan Hadir' },
        { nama: 'Budi', pesan: 'Selamat berbahagia', konfirmasi: 'Hadir' },
    ])
    const paginatedMessages = computed(() => {
        const start = (currentPage.value - 1) * perPage
        return rsvpList.value.slice(start, start + perPage)
    })

    const currentPage = ref(1)
    const perPage = 3

    const totalPages = computed(() => Math.ceil(rsvpList.value.length / perPage))

    // Pagination visible pages (max 3 angka)
    const visiblePages = computed(() => {
        if (totalPages.value <= 3) return Array.from({ length: totalPages.value }, (_, i) => i + 1)
        
        if (currentPage.value === 1) return [1, 2, 3]
        if (currentPage.value === totalPages.value) return [totalPages.value - 2, totalPages.value - 1, totalPages.value]
        
        return [currentPage.value - 1, currentPage.value, currentPage.value + 1]
    })

    function copyToClipboard(event) {
        const text = event.currentTarget.getAttribute('data-no')
        if (!text) return

        navigator.clipboard.writeText(text).then(() => {
            copied.value = true
            setTimeout(() => {
            copied.value = false
            }, 2000) // notifikasi muncul 2 detik
        })
    }

    function prevPage() {
        if (currentPage.value > 1) currentPage.value--
    }

    function nextPage() {
        if (currentPage.value < totalPages.value) currentPage.value++
    }

    onMounted(() => {
        for (let i = 0; i < snowCount; i++) {
            const snow = document.createElement('div')
            snow.classList.add('snowflake')
            snow.style.left = Math.random() * 100 + 'vw'
            snow.style.width = snow.style.height = (2 + Math.random() * 3) + 'px' // ukuran acak
            snow.style.opacity = 0.3 + Math.random() * 0.7
            snow.style.animationDuration = (5 + Math.random() * 5) + 's'
            snow.style.animationDelay = Math.random() * 5 + 's'
            snowContainer.value.appendChild(snow)
        }
    })

    onMounted(() => {
        initSwiper();
        timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate - now

            if (distance <= 0) {
            clearInterval(timer)
            days.value = "00"
            hours.value = "00"
            minutes.value = "00"
            seconds.value = "00"
            return
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24))
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const s = Math.floor((distance % (1000 * 60)) / 1000)

            days.value = String(d).padStart(2, "0")
            hours.value = String(h).padStart(2, "0")
            minutes.value = String(m).padStart(2, "0")
            seconds.value = String(s).padStart(2, "0")
        }, 1000)
    })

    onUnmounted(() => {
        clearInterval(timer)
    })
</script>

<template>
    <LoadingScreen/>
    <div class="flex lg:flex-row flex-col">
        
        <div class="relative w-4/6 h-screen hidden lg:flex flex-col gap-4 justify-end items-center py-20 bg-[url(/images/dummy-cover.jpg)] bg-cover bg-no-repeat overflow-hidden">
            <div class="absolute inset-0 bg-black opacity-60"></div>
            <!-- Salju container -->
            <div ref="snowContainer" class="absolute inset-0 pointer-events-none"></div>
            <h1 class="relative text-white font-title text-4xl text-center flex flex-col leading-[3rem]">
                <span>
                    Julang Hadinata  
                </span>
                <span>
                    &
                </span>
                <span>
                    Shinta Dewi
                </span>
            </h1>
            <div class="relative text-white flex flex-col gap-4">
                <p class="font-primary text-center">Kepada Yth. <br> Bpk/Ibu/Saudara/I</p>
                <p class="font-primary text-lg text-center font-semibold tracking-wide">ASEP SAMSUDIN</p>
            </div>
        </div>

        <div :class="['fixed z-50 w-full h-screen lg:hidden flex flex-col gap-4 justify-end items-center py-32 bg-[url(/images/dummy-cover.jpg)] bg-cover bg-no-repeat overflow-hidden transition-transform duration-500', isClosed ? '-translate-y-full' : 'translate-y-0']">
            <div class="absolute inset-0 bg-black opacity-60"></div>
            <!-- Salju container -->
            <div ref="snowContainer" class="absolute inset-0 pointer-events-none"></div>
            <h1 class="relative text-white font-title text-4xl text-center flex flex-col leading-[3rem]">
                <span >
                    Julang Hadinata  
                </span>
                <span>
                    &
                </span>
                <span>
                    Shinta Dewi
                </span>
            </h1>
            <div class="relative text-white flex flex-col gap-4">
                <p class="font-primary text-center">Kepada Yth. <br> Bpk/Ibu/Saudara/I</p>
                <p class="font-primary text-lg text-center font-semibold tracking-wide">ASEP SAMSUDIN</p>
            </div>
            <div class="relative w-full flex justify-center">
                <button class="absolute flex gap-2 items-center font-primary bg-white text-xs font-semibold text-black px-4 py-2 animate-bounce-scale" @click="isClosed = true">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-black relative -top-[2px]" viewBox="0 0 256 256"><path d="M228.44,89.34l-96-64a8,8,0,0,0-8.88,0l-96,64A8,8,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A8,8,0,0,0,228.44,89.34ZM96.72,152,40,192V111.53Zm16.37,8h29.82l56.63,40H56.46Zm46.19-8L216,111.53V192ZM128,41.61l81.91,54.61-67,47.78H113.11l-67-47.78Z"></path></svg>
                    Buka Undangan
                </button>
            </div>
        </div>

        <div class="relative flex h-screen overflow-hidden w-full lg:w-2/6">
            <div class="relative z-30 w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar">
                
                <section class="h-screen snap-center bg-black bg-opacity-60 snap-always flex flex-col gap-4 justify-center items-center">
                    <h2 class="font-title text-4xl text-center text-white  flex flex-col leading-[3rem]">
                        <span 
                            data-animate="fadeLeft" 
                            data-duration="1.2" 
                            data-once="false">
                            Julang Hadinata  
                        </span>
                        <span 
                            data-animate="zoomIn" 
                            data-duration="1.2" 
                            data-once="false">
                            &
                        </span>
                        <span
                            data-animate="fadeRight" 
                            data-duration="1.2" 
                            data-once="false">
                            Shinta Dewi
                        </span>
                    </h2>
                    <p 
                        data-animate="zoomIn" 
                        data-duration="1.2" 
                        data-once="false"class="font-primary text-white font-semibold uppercase text-center">
                        Sabtu, 08 Oktober 2026
                    </p>
                </section>

                <section class="relative px-10 py-20 h-screen snap-center snap-always bg-[url(/images/dummy.jpg)] bg-cover bg-no-repeat">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                    <div class="absolute inset-x-0 bottom-28 text-white">
                        <div 
                            data-animate="fadeInUp" 
                            data-duration="1.2" 
                            data-once="false" 
                            class="flex flex-col justify-center items-center text-center gap-2">
                            <h2 class="font-subtitle text-xl">I Gst Rai Putra Julang Hadinata, S.Kom</h2>
                            <p class="font-primary">Putra kedua Bapak Raden Basuki Sudirgo <br> dan Ibu I Gusti Ayu Mas Ariastuti</p>
                        </div>
                    </div>
                </section>

                <section class="relative px-10 py-20 h-screen snap-center snap-always bg-[url(/images/dummy-2.jpg)] bg-cover bg-no-repeat">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                    <div class="absolute inset-x-0 bottom-28 text-white">
                        <div 
                            data-animate="fadeInUp" 
                            data-duration="1.2" 
                            data-once="false" 
                            class="flex flex-col justify-center items-center text-center gap-2">
                            <h2 class="font-subtitle text-xl">Ni Kadek Shinta Dewi, S.Tr.Par</h2>
                            <p class="font-primary">Putra kedua Bapak  <br> dan Ibu </p>
                        </div>
                    </div>
                </section>

                <section class="relative px-10 py-20 h-screen snap-center bg-black bg-opacity-60 snap-always flex flex-col justify-center items-center">
                    <div class="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div 
                        class="relative p-2 flex flex-col gap-1 justify-center items-center text-center" 
                        data-animate="zoomInUp" 
                        data-duration="1.2" 
                        data-once="false">
                        <h2 class="font-subtitle text-white uppercase font-semibold text-2xl pb-4 tracking-wide">Lokasi & Waktu Acara</h2>
                        <p class="font-primary text-white text-lg font-medium uppercase">Sabtu, 08 Oktober 2026</p>
                        <p class="font-primary text-white text-sm uppercase">16.00 WITA - 22.00 WITA</p>
                        <P class="font-primary text-white text-sm uppercase">Griya Taksu - Jl. Ir. Sutami, Kemenuh, Kabupaten Gianyar, Bali</P>
                    </div>
                    <div id="countdown" class="relative text-white text-center mt-6 font-primary grid grid-cols-4 w-full gap-3 px-5 xl:px-10" 
                        data-animate="zoomInUp" 
                        data-duration="1.2" 
                        data-once="false">
                        <div class="flex flex-col border border-solid border-white rounded py-2">
                            <span class="text-xl font-semibold">
                                {{ days }}
                            </span>
                            <span class="text-sm">
                                Hari
                            </span>
                        </div>
                        <div class="flex flex-col border border-solid border-white rounded py-2">
                            <span class="text-xl font-semibold">
                                {{ hours }}
                            </span>
                            <span class="text-sm">
                                Jam
                            </span>
                        </div>
                        <div class="flex flex-col border border-solid border-white rounded py-2">
                            <span class="text-xl font-semibold">
                                {{ minutes }}
                            </span>
                            <span class="text-sm">
                                Menit
                            </span>
                        </div>
                        <div class="flex flex-col border border-solid border-white rounded py-2">
                            <span class="text-xl font-semibold">
                                {{ seconds }}
                            </span>
                            <span class="text-sm">
                                Detik
                            </span>
                        </div>
                    </div>
                    <a href="https://share.google/u3FXk3R7kdUEnHvPf" target="_blank"
                        class="font-primary flex justify-center items-center gap-2 text-xs xl:text-sm relative mt-6 
                                border border-white border-solid rounded py-2 px-4 text-white w-2/4
                                hover:bg-white hover:text-black transition-all duration-300 group"
                        data-animate="zoomInUp" 
                        data-duration="1.2" 
                        data-once="false"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 xl:w-5 h-4 xl:h-5 relative top-[-2px] fill-white group-hover:fill-black transition-all duration-300" viewBox="0 0 256 256">
                            <path d="M124,175a8,8,0,0,0,7.94,0c2.45-1.41,60-35,60-94.95A64,64,0,0,0,64,80C64,140,121.58,173.54,124,175ZM128,56a24,24,0,1,1-24,24A24,24,0,0,1,128,56ZM240,184c0,31.18-57.71,48-112,48S16,215.18,16,184c0-14.59,13.22-27.51,37.23-36.37a8,8,0,0,1,5.54,15C42.26,168.74,32,176.92,32,184c0,13.36,36.52,32,96,32s96-18.64,96-32c0-7.08-10.26-15.26-26.77-21.36a8,8,0,0,1,5.54-15C226.78,156.49,240,169.41,240,184Z"></path>
                        </svg>
                        <span class="uppercase font-semibold leading-none">Google Maps</span>
                    </a>
                </section>

                <section class="relative h-screen snap-center snap-always bg-black bg-opacity-70 flex flex-col justify-center items-center p-10 backdrop-blur-sm">
                    <h2 
                        data-animate="zoomIn" 
                        data-duration="1.2" 
                        data-once="false"
                        class="relative font-subtitle text-white uppercase font-semibold text-2xl pb-6 tracking-wide">Galeri</h2>
                    <div class="relative bg-gray-600/50 backdrop-blur-md rounded-lg mb-4 w-full max-w-4xl aspect-video"
                        data-animate="zoomInLeft" 
                        data-duration="1.2" 
                        data-once="false"
                    >
                        <iframe 
                        class="w-full h-full rounded-lg"
                        src="https://www.youtube.com/embed/latubAUbE0U?si=MR30GcN7LkfsYgim" 
                        title="YouTube video player" 
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                        </iframe>
                    </div>
                    <div class="relative w-full h-[30dvh]"
                        data-animate="zoomInRight" 
                        data-duration="1.2" 
                        data-once="false">
                        <div style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="swiper mySwiper2">
                            <div class="swiper-wrapper">
                                <div v-for="img in images" class="swiper-slide">
                                    <img :src="img"/>
                                </div>
                            </div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                        <div thumbsSlider="" class="swiper mySwiper">
                            <div class="swiper-wrapper">
                                <div v-for="img in images" class="swiper-slide">
                                    <img :src="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="relative h-screen snap-center snap-always bg-black bg-opacity-70 flex flex-col justify-center items-center p-10 backdrop-blur-sm">
                    <h2 
                        data-animate="zoomIn" 
                        data-duration="1.2" 
                        data-once="false"
                        class="relative font-subtitle text-white uppercase font-semibold text-2xl pb-6 tracking-wide">Galeri</h2>
                    <div class="relative bg-gray-600/50 backdrop-blur-md rounded-lg mb-4 w-full max-w-4xl aspect-video"
                        data-animate="zoomInUp" 
                        data-duration="1.2" 
                        data-once="false">
                        <iframe 
                        class="w-full h-full rounded-lg"
                        src="https://www.youtube.com/embed/latubAUbE0U?si=MR30GcN7LkfsYgim" 
                        title="YouTube video player" 
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                        </iframe>
                    </div>
                    <div class="relative w-full h-[30dvh]"
                        data-animate="zoomInDown" 
                        data-duration="1.2" 
                        data-once="false">
                        <div style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="swiper mySwiper4">
                            <div class="swiper-wrapper">
                                <div v-for="img in images" class="swiper-slide">
                                    <img :src="img"/>
                                </div>
                            </div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                        <div thumbsSlider="" class="swiper mySwiper3">
                            <div class="swiper-wrapper">
                                <div v-for="img in images" class="swiper-slide">
                                    <img :src="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="relative h-screen snap-center snap-always bg-black bg-opacity-70 flex flex-col justify-center items-center p-10 backdrop-blur-sm">
                    <h2 
                        data-animate="zoomIn" 
                        data-duration="1.2" 
                        data-once="false"
                        class="relative font-subtitle text-white uppercase font-semibold text-2xl pb-6 tracking-wide">Ucapan</h2>
                    <div class="relative w-full bg-white p-4 rounded-lg shadow-md"
                        data-animate="fadeLeft" 
                        data-duration="1.2" 
                        data-once="false">
                        <!-- Form -->
                        <form @submit.prevent="submitForm" class="flex flex-col gap-2">
                            <input v-model="form.nama" type="text" placeholder="Nama" class="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30 text-sm"/>
                            <textarea v-model="form.pesan" rows="3" placeholder="Ucapan" class="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30 text-sm"></textarea>
                            <select v-model="form.konfirmasi" class="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30 text-sm">
                            <option value="Hadir">Hadir</option>
                            <option value="Tidak Hadir">Tidak Hadir</option>
                            <option value="Akan Diusahakan Hadir">Akan Diusahakan Hadir</option>
                            </select>
                            <button type="submit" class="bg-black text-white py-2 rounded hover:bg-slate-700 text-sm transition-all duration-300">Kirim</button>
                        </form>
                    </div>

                    <!-- Daftar Pesan -->
                    <div class="relative w-full bg-white p-4 rounded-lg shadow-md mt-2"
                        data-animate="fadeRight" 
                        data-duration="1.2" 
                        data-once="false">
                        <div class="max-h-[28dvh] lg:max-h-[25dvh] xl:max-h-[30dvh] overflow-y-auto">
                            <transition-group name="slide-fade" tag="div" class="flex flex-col gap-2">
                            <div v-for="(rsvp, index) in paginatedMessages" :key="index" class="border p-4 rounded-lg flex flex-col gap-2 bg-gray-50 hover:bg-gray-100 transition">
                                <p class="font-semibold text-gray-800 text-sm">{{ rsvp.nama }} 
                                <span class="ml-2 rounded-lg bg-gray-300 text-xs px-2 py-1 font-normal">{{ rsvp.konfirmasi }}</span>
                                </p>
                                <p class="text-gray-600 text-xs">{{ rsvp.pesan }}</p>
                            </div>
                            </transition-group>
                        </div>

                        <!-- Pagination -->
                        <div class="flex justify-center mt-4 items-center space-x-2 text-xs">
                            <button 
                                @click="prevPage" 
                                :disabled="currentPage === 1" 
                                class="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <button
                                v-for="page in visiblePages"
                                :key="page"
                                @click="currentPage = page"
                                :class="currentPage === page ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'"
                                class="px-3 py-1 rounded hover:bg-black/30 text-white transition"
                            >
                                {{ page }}
                            </button>

                            <button 
                                @click="nextPage" 
                                :disabled="currentPage === totalPages" 
                                class="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </section>

                <section class="relative h-screen snap-center snap-always bg-black bg-opacity-70 flex flex-col justify-center items-center p-6 backdrop-blur-sm">
                    <h2 data-animate="zoomIn" 
                        data-duration="1.2" 
                        data-once="false"
                        class="relative font-subtitle text-white uppercase font-semibold text-2xl pb-10 tracking-wide">Kado Digital</h2>
                    <a
                        data-no="1680002037990"
                        class="copyBtn flex gap-6 items-center text-white font-primary py-6 px-4 border border-solid border-white rounded-lg bg-gray-50 bg-opacity-20 cursor-pointer mb-5"
                        @click="copyToClipboard"
                        data-animate="fadeLeft" 
                        data-duration="1.2" 
                        data-once="false"
                        >
                        <span class="flex gap-2">
                        <img src="/images/mandiri.png" alt="logo bank mandiri" class="object-contain w-20" />
                        <span class="flex flex-col text-xs font-semibold">
                            168-000-203-7990
                            <p>I Gst Rai Putra Julang Hadinata</p>
                        </span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-white" viewBox="0 0 256 256">
                        <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
                        </svg>
                    </a>

                    <a
                        data-no="0382029285"
                        class="copyBtn flex gap-6 items-center text-white font-primary py-6 px-4 border border-solid border-white rounded-lg bg-gray-50 bg-opacity-20 cursor-pointer"
                        @click="copyToClipboard"
                        data-animate="fadeRight" 
                        data-duration="1.2" 
                        data-once="false"
                        >
                        <span class="flex gap-2">
                            <img src="/images/bni.png" alt="logo bank mandiri" class="object-contain w-20" />
                            <span class="flex flex-col text-xs font-semibold">
                                038-202-9285
                                <p>I Gst Rai Putra Julang Hadinata</p>
                            </span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-white" viewBox="0 0 256 256">
                            <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
                        </svg>
                    </a>

                    <!-- Notifikasi -->
                    <div v-if="copied" class="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity">
                        Berhasil disalin!
                    </div>
                </section>

                <section class="h-screen snap-center bg-black bg-opacity-60 snap-always flex flex-col gap-4 justify-end items-center py-20 px-6">
                    <h2 class="font-title text-4xl text-center text-white  flex flex-col leading-[3rem]">
                        <span 
                        data-animate="fadeLeft" 
                        data-duration="1.2" 
                        data-once="false">
                            Julang Hadinata  
                        </span>
                        <span 
                            data-animate="zoomIn" 
                            data-duration="1.2" 
                            data-once="false">
                            &
                        </span>
                        <span
                            data-animate="fadeRight" 
                            data-duration="1.2" 
                            data-once="false">
                            Shinta Dewi
                        </span>
                    </h2>
                    <p 
                        data-animate="zoomIn" 
                        data-duration="1.2" 
                        data-once="false"
                        class="font-primary text-sm text-white text-center">
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                        Bapak/Ibu/Saudara/I Dapat berkenan hadir dan memberikan do’a
                        restu
                    </p>
                </section>

            </div>

            <video autoplay loop muted playsinline preload="auto" class="absolute inset-0 z-10 w-full h-full object-cover filter grayscale">
                <source src="/videos/patisserie.webm" type="video/webm">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
</template>

<style scoped>
    .swiper {
        width: 100%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-slide {
        text-align: center;
        background: #444;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
    }

    .mySwiper2 {
        height: 80%;
        width: 100%;
    }
    .mySwiper {
        height: 40%;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .mySwiper .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }
    .mySwiper .swiper-slide-thumb-active {
        opacity: 1;
    }
    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
    }

    .swiper3 {
        width: 100%;
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    .mySwiper4 {
        height: 80%;
        width: 100%;
    }
    .mySwiper3 {
        height: 40%;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .mySwiper3 .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }
    .mySwiper3 .swiper-slide-thumb-active {
        opacity: 1;
    }

    /* Salju */
    .snowflake {
        @apply absolute bg-white rounded-full pointer-events-none;
        top: -10px;
        animation-name: fall;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes fall {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
        }
        100% {
            transform: translateY(110vh) translateX(30px);
            opacity: 0.2;
        }
    }

    /* Form */
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all 0.5s ease;
    }

    .slide-fade-enter-from {
        opacity: 0;
        transform: translateY(20px);
    }
    .slide-fade-enter-to {
        opacity: 1;
        transform: translateY(0);
    }
</style>
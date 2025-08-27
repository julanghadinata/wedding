import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, Pagination, EffectFade, Thumbs } from "swiper/modules";

Swiper.use([Autoplay, Navigation, Pagination, EffectFade, Thumbs]);

export function initSwiper() {
    var swiper1 = new Swiper(".mySwiper", {
        slidesPerView: 4.5,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 10,
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper1,
        },
    });

    var swiper3 = new Swiper(".mySwiper3", {
        slidesPerView: 4.5,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesProgress: true,
    });

    var swiper4 = new Swiper(".mySwiper4", {
        loop: true,
        spaceBetween: 10,
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper3,
        },
    });
}
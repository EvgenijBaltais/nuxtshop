<template>
  <div class="single-product">
    <div class="glide product-carousel">
      <div class="product-main__left"></div>
      <div class="product-main__right"></div>
      <div class="glide__track product__track" data-glide-el="track">
        <div class="glide__slides product__slides"></div>
      </div>
      <div class="product-slider__navigation"></div>
    </div>
    <div class="product-description">
      <div class="product-title">
        <div class="product-description__title">
          <span class="product-description__span bold-text">{{
            product.title
          }}</span>
        </div>
        <div class="product-description__price">
          <span class="product-description__span">{{ product.price }} р</span>
        </div>
      </div>
      <div class="product-text">
        <p class="product-text__p">{{ product.description }}</p>
      </div>
      <div class="product-amount-info">
        <p class="product-amount-text">
          <span class="product-amount-text-span">Количество:</span>
          <a class="product-decrease-value" @click="decreaseValue">−</a>
          <span class="product-amount-text-value">1</span>
          <a class="product-increase-value" @click="increaseValue">+</a>
        </p>
        <p class="product-price-text">
          <span class="product-amount-price">Сумма заказа: </span>
          <span class="product-amount-price-value">
            <span class="product-final-value"> {{ product.price }}</span> руб
          </span>
        </p>
      </div>
      <div class="product-contains" v-on:click="openContainer()">
        <div class="product-contains__title">
          <span>Состав букета:</span>
          <img
            src="@/assets/icons/to-bottom.svg"
            alt=""
            class="to-bottom-arrow"
          />
        </div>
        <div class="product-contains__inside">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          consequuntur numquam fuga! Dolorum sapiente necessitatibus, dicta
          totam eaque sit laborum quasi quas, deserunt natus saepe fugiat.
          Molestiae praesentium accusantium eius?
        </div>
      </div>
      <div class="order-datepicker-wrap">
        <div class="datepicker-title">
          <span>Выберите дату заказа:</span>
        </div>
        <div class="order-datepicker-insert"></div>
        <div class="when-choose">
          <p class="order-info-item">
            Вы выбрали дату:
            <span class="choosen-date" id="choosen-date"></span>
          </p>
          <p class="order-info-item">Выберите предпочтительное время:</p>
          <div class="time-variants">
            <div class="time-item" @click="activateTime">10:00</div>
            <div class="time-item" @click="activateTime">11:00</div>
            <div class="time-item" @click="activateTime">12:00</div>
            <div class="time-item" @click="activateTime">13:00</div>
            <div class="time-item" @click="activateTime">14:00</div>
            <div class="time-item" @click="activateTime">15:00</div>
            <div class="time-item" @click="activateTime">16:00</div>
            <div class="time-item" @click="activateTime">17:00</div>
            <div class="time-item" @click="activateTime">18:00</div>
            <div class="time-item" @click="activateTime">19:00</div>
            <div class="time-item" @click="activateTime">20:00</div>
            <div class="time-item" @click="activateTime">21:00</div>
            <div class="time-item" @click="activateTime">22:00</div>
            <div class="time-item" @click="activateTime">23:00</div>
            <div class="time-item" @click="activateTime">24:00</div>
          </div>
        </div>
      </div>
      <div class="order-details">
        <div class="order-details-form">
          <div class="order-details-text">
            <p>
              Оставьте Ваши контактные данные для уточнения деталей и
              подтверждения заказа.<br />
              Мы свяжемся с Вами и уточним все нюансы.<br />
              Для этого достаточно указать номер телефона, остальные поля по
              желанию:
            </p>
          </div>
          <form action="/" class="order-data-fields">
            <input
              type="phone"
              class="order-data-phone mandatory-info"
              placeholder="+7 (___) ___-__-__"
            />
            <input type="name" class="order-data-name" placeholder="Ваше имя" />
            <input type="email" class="order-data-email" placeholder="_@_.__" />
            <textarea
              name="additional-info"
              class="order-data-additional"
              placeholder="Адрес доставки и дополнительные пожелания"
            ></textarea>
            <button class="send-order" @click.prevent="sendOrder()">
              Отправить заказ!
            </button>
          </form>
        </div>
        <div class="item-order-w">
          <button class="item-order" @click="getOrderForm()">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pickmeup from "pickmeup";
import axios from "axios";
import closeMenu from "~/mixins/closeMenu.js";
import Glide from "@glidejs/glide";

export default {
  name: "Single_product",
  mixins: [closeMenu],
  components: {},
  data() {
    return {
      product: {},
      images: [],
      sendingForm: 0,
      isDesktop: 1,
      productGlide: {},
    };
  },
  methods: {
    openContainer: function () {
      if (
        !(
          event.target.classList.contains("product-contains") ||
          this.getParent(event.target, "product-contains")
        )
      ) {
        return false;
      }

      let productContains = document.querySelector(".product-contains");
      productContains.classList.contains("product-contains-opened")
        ? productContains.classList.remove("product-contains-opened")
        : productContains.classList.add("product-contains-opened");
    },
    moveCarousel: function () {
      if (event.target.classList.contains("product-slider__active-img")) {
        return false;
      }

      let parent = this.getParent(event.target, "product-slider__wrapper"),
        width =
          event.target.offsetWidth +
          parseFloat(
            getComputedStyle(event.target, null).marginRight.replace("px", "")
          ),
        elementIndex = 0,
        path = "";

      // Поменять активный элемент

      parent
        .querySelector(".product-slider__active-img")
        .classList.remove("product-slider__active-img");
      event.target.classList.add("product-slider__active-img");

      // Определить номер активного элемента

      for (
        let i = 0;
        i < parent.querySelectorAll(".product-slider__simg").length;
        i++
      ) {
        if (
          parent
            .querySelectorAll(".product-slider__simg")
            [i].classList.contains("product-slider__active-img")
        ) {
          elementIndex = i;
          break;
        }
      }

      path = require("@/assets/pics/products/" +
        this.images[elementIndex].id +
        ".webp");
      document.querySelector(".product-slider__bimg").setAttribute("src", path);

      if (elementIndex < 1) return false;

      // Проиграть анимацию

      parent.style.marginLeft = -(elementIndex - 1) * width + "px";
    },
    moveCarouselLeft() {
      let parent = document.querySelector(".product-slider__wrapper"),
        items = document.querySelectorAll(".product-slider__simg"),
        elementIndex = 0,
        width = 0,
        path = "";

      // Если карусель в начальной позиции то return false

      if (items[0].classList.contains("product-slider__active-img")) {
        return false;
      }

      // Определить номер активного элемента

      for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("product-slider__active-img")) {
          elementIndex = i;
          break;
        }
      }

      items[elementIndex].classList.remove("product-slider__active-img");
      elementIndex -= 1;
      items[elementIndex].classList.add("product-slider__active-img");

      path = require("@/assets/pics/products/" +
        this.images[elementIndex].id +
        ".webp");
      document.querySelector(".product-slider__bimg").setAttribute("src", path);

      if (elementIndex == 0) return false;

      width =
        items[elementIndex].offsetWidth +
        parseFloat(
          getComputedStyle(items[elementIndex], null).marginRight.replace(
            "px",
            ""
          )
        );
      parent.style.marginLeft = -(elementIndex - 1) * width + "px";
    },
    moveCarouselRight() {
      let parent = document.querySelector(".product-slider__wrapper"),
        items = document.querySelectorAll(".product-slider__simg"),
        elementIndex = 0,
        width = 0,
        path = "";

      // Если карусель в начальной позиции то return false

      if (
        items[items.length - 1].classList.contains("product-slider__active-img")
      ) {
        return false;
      }

      // Определить номер активного элемента

      for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("product-slider__active-img")) {
          elementIndex = i;
          break;
        }
      }

      items[elementIndex].classList.remove("product-slider__active-img");
      elementIndex += 1;
      items[elementIndex].classList.add("product-slider__active-img");

      path = require("@/assets/pics/products/" +
        this.images[elementIndex].id +
        ".webp");
      document.querySelector(".product-slider__bimg").setAttribute("src", path);

      if (elementIndex == items[items.length - 1]) return false;

      width =
        items[elementIndex].offsetWidth +
        parseFloat(
          getComputedStyle(items[elementIndex], null).marginRight.replace(
            "px",
            ""
          )
        );
      parent.style.marginLeft = -(elementIndex - 1) * width + "px";
    },
    makeOrder: function () {},
    addToCart() {
      this.$store.dispatch({
        type: "addToCart",
        id: this.product_id,
        amount: 1,
      });
    },
    formatDate(date) {
      var dd = date.getDate();
      if (dd < 10) dd = "0" + dd;

      var mm = date.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      var yy = date.getFullYear();
      if (yy < 10) yy = "0" + yy;

      return yy + "-" + mm + "-" + dd;
    },
    getOrderForm: function () {
      const offsetTop = event.target.offsetTop - 100;

      if (event.target.classList.contains("item-order-active")) {
        document.querySelector(".order-details-form").removeAttribute("style");
        event.target.classList.remove("item-order-active");
        event.target.innerText = "Оформить заказ";
        return false;
      } else {
        document.querySelector(".order-details-form").style.display = "block";
        event.target.classList.add("item-order-active");
        event.target.innerText = "Скрыть форму заказа";
      }

      scroll({
        top: offsetTop,
        behavior: "smooth",
      });
    },
    sendOrder: function () {
      if (this.sendingForm != 0) return false;

      if (!document.querySelector(".order-data-phone").inputmask.isComplete()) {
        document.querySelector(".order-data-phone").style.outline =
          "1px solid red";
        return false;
      }

      this.sendingForm = 1;

      let clientData = {};

      // Телефон
      clientData.phone = document.querySelector(".order-data-phone").value;

      // Дата
      document.getElementById("choosen-date").innerText.length == 10
        ? (clientData.date = this.formatDate(
            pickmeup(".order-datepicker-insert").get_date()
          ))
        : "";

      // Время
      document.querySelector(".time-item-active")
        ? (clientData.time =
            document.querySelector(".time-item-active").innerText)
        : "";

      // Имя
      document.querySelector(".order-data-name").value
        ? (clientData.name = document.querySelector(".order-data-name").value)
        : "";

      // Email
      document.querySelector(".order-data-email").value &&
      document.querySelector(".order-data-email").value.indexOf("@") != -1
        ? (clientData.email = document.querySelector(".order-data-email").value)
        : "";

      // Дополнительная инфа
      document.querySelector(".order-data-additional").value
        ? (clientData.additional = document.querySelector(
            ".order-data-additional"
          ).value)
        : "";

      // Инфа по товару

      let order = {},
        amount = parseInt(
          document.querySelector(".product-amount-text-value").innerText
        );

      order[0] = {
        id: this.product.id,
        amount: amount,
        price: this.product.price * amount,
      };

      clientData.order = JSON.stringify(order);

      // Клиент
      document.body.getAttribute("client_id")
        ? (clientData.client = document.body.getAttribute("client_id"))
        : "";

      // Номер формы
      clientData.form_id = 1;

      let ev = event.target;

      axios.interceptors.request.use((req) => {
        ev.innerText = "Отправляем...";
        return req;
      });

      axios.interceptors.response.use((res) => {
        return res;
      });

      axios
        .post("//79.174.12.75:3001/send_order", {
          params: {
            clientData: clientData,
          },
        })
        .then((response) => {
          response.data == "Нет телефона"
            ? (ev.innerText = "Не введен телефон!")
            : (ev.innerText = "Успех!");
          setTimeout(() => {
            ev.innerText = "Отправить заказ!";
            this.sendingForm = 0;
          }, 2000);
        });
    },
    increaseValue: function () {
      let parent = this.getParent(event.target, "product-amount-text"),
        value = parseInt(
          parent.querySelector(".product-amount-text-value").innerText
        );
      value < 100
        ? (parent.querySelector(".product-amount-text-value").innerText =
            value + 1)
        : "";

      document.querySelector(".product-final-value").innerText =
        this.product.price * (value + 1);
    },
    decreaseValue: function () {
      let parent = this.getParent(event.target, "product-amount-text"),
        value = parseInt(
          parent.querySelector(".product-amount-text-value").innerText
        );

      if (value < 2) return false;

      parent.querySelector(".product-amount-text-value").innerText = value - 1;
      document.querySelector(".product-final-value").innerText =
        this.product.price * (value - 1);
    },
    getParent: function (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    },
    getClickedElementIndex: function (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (event.target == arr[i]) return i;
      }
    },
    activateTime: function () {
      if (event.target.parentNode.querySelector(".time-item-active")) {
        event.target.parentNode
          .querySelector(".time-item-active")
          .classList.remove("time-item-active");
      }
      event.target.classList.add("time-item-active");

      scroll({
        top: document.querySelector(".time-variants").offsetTop + 230,
        behavior: "smooth",
      });
    },
  },
  computed: {
    product_id() {
      return this.$route.params.item;
    },
  },
  mounted() {
    // Моб / не моб
    window.screen.width < 1150 ? (this.isDesktop = false) : "";

    // Закрыть меню
    this.closeMenu();

    // Инфа о товаре

    axios
      .get("//79.174.12.75:3001/products/id", {
        method: "GET",
        params: {
          id: this.$route.params.item,
        },
      })
      .then((response) => {
        this.product = response.data[0];
      });

    // Картинки

    axios
      .get("//79.174.12.75:3001/images/id", {
        method: "GET",
        params: {
          id: this.$route.params.item,
        },
      })
      .then((response) => {
        this.images = response.data;

        let where = document.querySelector(".product__slides"),
          sliderNav = document.querySelector(".product-slider__navigation");

        for (let i = 0; i < this.images.length; i++) {
          where.insertAdjacentHTML(
            "beforeend",
            `<div class='glide__slide product__slide glide__slide__noimage'
                        style = 'background-image: url(${require("@/assets/pics/products/" +
                          this.images[i].id +
                          ".webp")})'>
                        </div>`
          );

          sliderNav.insertAdjacentHTML(
            "beforeend",
            `<div class = 'product-slider__mini-w ${
              i == 0 ? "product-slider__mini-w-active" : ""
            }'
                            style = 'background-image: url(${require("@/assets/pics/products/" +
                              this.images[i].id +
                              ".webp")})'>
                        </div>`
          );
        }
      })
      .then(() => {
        // Карусель

        this.productGlide = new Glide(".product-carousel", {
          autoplay: false,
          type: "carousel",
          animationDuration: 300,
          animationTimingFunc: "ease-in-out",
        });

        let myProductGlide = this.productGlide;

        this.productGlide.on("run.before", function () {
          document
            .querySelector(".product-slider__mini-w-active")
            .classList.remove("product-slider__mini-w-active");
        });
        this.productGlide.on("run", function () {
          document
            .querySelectorAll(".product-slider__mini-w")
            [myProductGlide.index].classList.add(
              "product-slider__mini-w-active"
            );
        });

        myProductGlide.mount();

        document
          .querySelector(".product-main__right")
          .addEventListener("click", function () {
            myProductGlide.go(">");
          });

        document
          .querySelector(".product-main__left")
          .addEventListener("click", function () {
            myProductGlide.go("<");
          });

        // Клик по миниатюре - промотка карусели

        let clickIndex = this.getClickedElementIndex;

        for (
          let i = 0;
          i < document.querySelectorAll(".product-slider__mini-w").length;
          i++
        ) {
          document
            .querySelectorAll(".product-slider__mini-w")
            [i].addEventListener("click", function () {
              document
                .querySelector(".product-slider__mini-w-active")
                .classList.remove("product-slider__mini-w-active");
              document
                .querySelectorAll(".product-slider__mini-w")
                [i].classList.add("product-slider__mini-w-active");

              myProductGlide.go(
                `=${clickIndex(
                  document.querySelectorAll(".product-slider__mini-w")
                )}`
              );
            });
        }
      });

    // Календарь для заказа

    pickmeup.defaults.locales["ru"] = {
      days: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ],
      daysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthsShort: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
    };

    pickmeup(".order-datepicker-insert", {
      calendars: this.isDesktop ? 2 : 1,
      locale: "ru",
      current: 1,
      class_name: "order-datepicker",
      min: new Date(),
      format: "d.m.Y",
      select_year: false,
      flat: true,
    });

    pickmeup(".order-datepicker-insert").show();

    document
      .querySelector(".order-datepicker-insert")
      .addEventListener("pickmeup-change", function (e) {
        document.querySelector(".when-choose").style.display = "block";
        document.getElementById("choosen-date").innerText =
          e.detail.formatted_date;

        scroll({
          top: document.querySelector(".order-datepicker-wrap").offsetTop + 230,
          behavior: "smooth",
        });
      });

    // Вызов галереи

    // Маска телефона

    let im = new Inputmask("+7 (999) 999-99-99");
    im.mask(document.querySelector(".order-data-phone"));

    document
      .querySelector(".order-data-phone")
      .addEventListener("keyup", function () {
        event.target.style.outline = "1px solid #94CBE0";
      });
    document
      .querySelector(".order-data-phone")
      .addEventListener("focus", function () {
        event.target.style.outline = "1px solid #94CBE0";
      });
  },
};
</script>
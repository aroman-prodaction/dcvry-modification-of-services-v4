import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  MapPin,
  Minus,
  PencilLine,
  Plus,
  RotateCcw,
  Trash2,
  Users,
  X,
  Download,
} from "lucide-react";
import imgAnimation from "./assets/figma/service-animation.png";
import imgBike from "./assets/figma/service-bike.png";
import imgBoat from "./assets/figma/service-boat.png";
import imgBreakfast from "./assets/figma/service-breakfast.png";
import imgBuffet from "./assets/figma/service-buffet.png";
import imgConcert from "./assets/figma/service-concert.png";
import imgDinner from "./assets/figma/service-dinner.png";
import imgEarly from "./assets/figma/service-early.png";
import imgHotelLogo from "./assets/figma/hotel-logo.png";
import imgJazz from "./assets/figma/service-jazz.png";
import imgMassage from "./assets/figma/service-massage.png";
import imgParking from "./assets/figma/service-parking.png";
import imgPet from "./assets/figma/service-pet.png";
import imgRobe from "./assets/figma/service-robe.png";
import imgSauna from "./assets/figma/service-sauna-master.png";
import imgSaunaWood from "./assets/figma/service-sauna-wood.png";
import imgSpa from "./assets/figma/service-spa.png";

const money = new Intl.NumberFormat("ru-RU");

const images = {
  animation: imgAnimation,
  bike: imgBike,
  boat: imgBoat,
  breakfast: imgBreakfast,
  buffet: imgBuffet,
  concert: imgConcert,
  dinner: imgDinner,
  early: imgEarly,
  hotelLogo: imgHotelLogo,
  jazz: imgJazz,
  massage: imgMassage,
  parking: imgParking,
  pet: imgPet,
  robe: imgRobe,
  sauna: imgSauna,
  saunaWood: imgSaunaWood,
  spa: imgSpa,
};

const includedServices = [
  {
    id: "breakfast",
    title: "Завтрак",
    subtitle: "2 гостя • 4 ночи",
    image: images.breakfast,
  },
  {
    id: "early",
    title: "Ранний заезд (pre-checked)",
    subtitle: "1 шт.",
    image: images.early,
  },
];

const availableServices = [
  {
    id: "buffet",
    category: "Питание",
    title: 'Завтрак "Шведский стол"',
    description:
      "Начните свой день с великолепного шведского стола в нашем отеле! У нас вы найдете разнообразие блюд: от свежих фруктов и выпечки до горячих закусок и каш, приготовленных по вашему желанию.",
    footer: "2 гостя • 4 ночи",
    price: 15000,
    image: images.buffet,
  },
  {
    id: "breakfast",
    category: "Питание",
    title: "Завтрак",
    description:
      "Начните утро с полезного и вкусного завтрака в нашем отеле! Мы предлагаем свежие фрукты, полезную выпечку, горячие блюда и яйца по вашему желанию.",
    footer: "2 гостя • 4 ночи",
    price: 0,
    image: images.breakfast,
    included: true,
  },
  {
    id: "dinner",
    category: "Питание",
    title: "Романтический ужин",
    description:
      "Погрузитесь в атмосферу романтики с нашим изысканным ужином в отеле! Насладитесь изысканными блюдами, приготовленными специально для вас.",
    footer: "2 гостя",
    price: 4000,
    image: images.dinner,
    simpleStepper: true,
  },
  {
    id: "spa",
    category: "СПА услуги",
    title: 'Авторская СПА программа "Турецкий шарм"',
    description:
      "Турецкий пенный массаж по традициям проводится в хаммаме. После прогревания и распаривания кожи ритуал продолжается пилингом рукавицей Кесса.",
    footer: "1 гость • 2 часа",
    price: 4500,
    image: images.spa,
    hourly: true,
  },
  {
    id: "massage",
    category: "СПА услуги",
    title: "Массаж расслабляющий",
    description:
      "Погрузитесь в мир полного расслабления с нашим расслабляющим массажем в СПА центре отеля. Позвольте опытным мастерам снять напряжение.",
    footer: "1 гость • 1 час",
    price: 3000,
    image: images.massage,
  },
  {
    id: "sauna-wood",
    category: "СПА услуги",
    title: "Баня на дровах",
    description:
      "Откройте для себя уникальный ритуал в \"Бане на дровах\" — классическую парную процедуру. Начните с глубокого прогревания и распаривания кожи.",
    footer: "От 4 гостей • от 2 часов",
    price: 10000,
    image: images.saunaWood,
  },
  {
    id: "sauna-master",
    category: "СПА услуги",
    title: "Баня с пармастером",
    description:
      "Откройте для себя уникальный ритуал в банях с пармастером — традиционными помощниками для идеального парения.",
    footer: "4 гостя • 2 часа",
    price: 16000,
    image: images.sauna,
    hourly: true,
  },
  {
    id: "animation",
    category: "Досуг и развлечение",
    title: "Детская анимация",
    description:
      "Веселая детская анимация в нашем отеле — яркие игры, творческие мастер-классы и незабываемые приключения для малышей.",
    footer: "1 шт.",
    price: 1200,
    image: images.animation,
  },
  {
    id: "concert",
    category: "Досуг и развлечение",
    title: "Концерт Las Palmas на террасе Club Nevarest",
    description:
      "Погрузитесь в атмосферу летнего вечера на террасе Club Nevarest! Концерт группы Las Palmas — это яркая смесь эмоций, зажигательных ритмов и незабываемых мелодий.",
    footer: "1 гость",
    price: 3000,
    image: images.concert,
    simpleStepper: true,
  },
  {
    id: "jazz",
    category: "Досуг и развлечение",
    title: "Концерт джазовой музыки в Club Nevarest",
    description:
      "Приглашаем вас на незабываемый концерт джазовой музыки в уютном Club Nevarest! Погрузитесь в атмосферу живых мелодий и душевных импровизаций.",
    footer: "1 гость",
    price: 2400,
    image: images.jazz,
  },
  {
    id: "boat",
    category: "Досуг и развлечение",
    title: "Экскурсия на катере",
    description:
      "Погрузитесь в незабываемое приключение с экскурсией на катере по живописной реке Неве и Финскому заливу.",
    footer: "4 гостя • 2 часа",
    price: 6000,
    image: images.boat,
  },
  {
    id: "bike",
    category: "Досуг и развлечение",
    title: "Прокат велосипеда",
    description:
      "Откройте для себя уникальную возможность насладиться природой и активным отдыхом с услугой проката велосипедов в нашем загородном отеле.",
    footer: "1 гость • 1 час",
    price: 500,
    image: images.bike,
  },
  {
    id: "parking",
    category: "Прочие услуги",
    title: "Парковка",
    description:
      "Мы предлагаем удобный паркинг для наших гостей! Вы можете оставить свой автомобиль на охраняемой территории, что обеспечит вам спокойствие во время отдыха.",
    footer: "4 ночи",
    price: 6500,
    image: images.parking,
  },
  {
    id: "pet",
    category: "Прочие услуги",
    title: "Проживание с животным",
    description:
      "Мы рады предложить услугу размещения с животными в нашем отеле, чтобы вы могли наслаждаться отдыхом вместе с вашим любимцем.",
    footer: "1 шт.",
    price: 5000,
    image: images.pet,
  },
  {
    id: "robe",
    category: "Прочие услуги",
    title: "Дополнительный халат и тапочки",
    description:
      "Эти удобные аксессуары не только добавляют уют в ваше пребывание, но и позволяют вам полностью расслабиться и насладиться отдыхом.",
    footer: "1 шт.",
    price: 800,
    image: images.robe,
  },
  {
    id: "early",
    category: "Прочие услуги",
    title: "Ранний заезд (pre-checked)",
    description:
      "Услуга \"Ранний заезд\" позволяет вам заселиться в номер до стандартного времени заезда. Это удобно для тех, кто прибывает рано.",
    footer: "1 шт.",
    price: 0,
    image: images.early,
    included: true,
  },
];

const originalTotal = 71200;
const saunaBasePrice = 16000;
const serviceFocusTimeoutMs = 3000;
const saunaTimeSlots = ["11:00", "13:30", "18:30", "20:30"];
const saunaDates = [
  { day: "12", weekday: "Чт", value: "12 ноября 2026" },
  { day: "13", weekday: "Пт", value: "13 ноября 2026" },
  { day: "14", weekday: "Сб", value: "14 ноября 2026" },
  { day: "15", weekday: "Вс", value: "15 ноября 2026" },
  { day: "16", weekday: "Пн", value: "16 ноября 2026" },
  { day: "17", weekday: "Вт", value: "17 ноября 2026" },
  { day: "18", weekday: "Ср", value: "18 ноября 2026" },
];
const saunaSpecialists = [
  "Любой",
  "Иван Васильевич",
  "Ярослав Святославович",
  "Степан Родионович",
];
const defaultSaunaSpecialist = saunaSpecialists[0];
const originalSnapshot = {
  dinnerQty: 2,
  concertQty: 1,
  petDeleted: false,
  saunaDeleted: false,
  saunaAdded: false,
  spaAdded: false,
  spaSlot: {
    date: "12 ноября 2026",
    time: "13:00",
    guests: 1,
    hours: 2,
  },
  spaBookings: [],
  saunaSlot: {
    date: "16 ноября 2026",
    time: "20:30",
    guests: 4,
    hours: 2,
    specialist: "Степан Родионович",
  },
  saunaBookings: [],
};

function getSaunaHours(slot) {
  return Math.max(2, slot.hours);
}

function getSaunaPrice(slot) {
  return saunaBasePrice + (getSaunaHours(slot) - 2) * 3000 + (slot.guests - 4) * 1000;
}

function getSimpleServiceDisplayQty(currentQty, baselineQty) {
  return currentQty > 0 ? currentQty : baselineQty;
}

function formatGuestCount(qty) {
  return `${qty} ${qty === 1 ? "гость" : "гостя"}`;
}

function iconActionLabel(label) {
  return {
    "aria-label": label,
    title: label,
  };
}

function getSaunaBookings(source) {
  if (Array.isArray(source.saunaBookings)) return source.saunaBookings;
  return source.saunaAdded && source.saunaSlot ? [{ ...source.saunaSlot }] : [];
}

function getSaunaBookingKey(booking) {
  return `${booking?.date || ""}|${booking?.time || ""}`;
}

function getOccupiedSaunaKeys(state) {
  const keys = new Set();
  if (!state.saunaDeleted) {
    keys.add(getSaunaBookingKey(originalSnapshot.saunaSlot));
  }
  getSaunaBookings(state).forEach((booking) => {
    keys.add(getSaunaBookingKey(booking));
  });
  return keys;
}

function isSaunaSlotOccupied(state, date, time) {
  return getOccupiedSaunaKeys(state).has(getSaunaBookingKey({ date, time }));
}

function getAvailableSaunaSlots(state, date) {
  return saunaTimeSlots.filter((time) => !isSaunaSlotOccupied(state, date, time));
}

function getFirstAvailableSaunaSlot(state) {
  const date = saunaDates.find((item) => getAvailableSaunaSlots(state, item.value).length > 0);
  if (!date) return null;
  return {
    date: date.value,
    time: getAvailableSaunaSlots(state, date.value)[0],
    guests: 4,
    hours: 2,
    specialist: defaultSaunaSpecialist,
  };
}

function sameSaunaBooking(a, b) {
  return (
    a?.date === b?.date &&
    a?.time === b?.time &&
    a?.guests === b?.guests &&
    getSaunaHours(a || { hours: 2 }) === getSaunaHours(b || { hours: 2 }) &&
    a?.specialist === b?.specialist
  );
}

function sameSaunaBookings(current, baseline) {
  const currentBookings = getSaunaBookings(current);
  const baselineBookings = getSaunaBookings(baseline);
  return (
    currentBookings.length === baselineBookings.length &&
    currentBookings.every((booking, index) =>
      sameSaunaBooking(booking, baselineBookings[index]),
    )
  );
}

function getSpaBookings(source) {
  if (Array.isArray(source.spaBookings)) return source.spaBookings;
  return source.spaAdded && source.spaSlot ? [{ ...source.spaSlot }] : [];
}

function sameSpaBooking(a, b) {
  return a?.date === b?.date && a?.time === b?.time;
}

function sameSpaBookings(current, baseline) {
  const currentBookings = getSpaBookings(current);
  const baselineBookings = getSpaBookings(baseline);
  return (
    currentBookings.length === baselineBookings.length &&
    currentBookings.every((booking, index) =>
      sameSpaBooking(booking, baselineBookings[index]),
    )
  );
}

function getSnapshot(state) {
  const saunaBookings = getSaunaBookings(state).map((booking) => ({ ...booking }));
  const spaBookings = getSpaBookings(state).map((booking) => ({ ...booking }));
  return {
    dinnerQty: state.dinnerQty,
    concertQty: state.concertQty,
    petDeleted: state.petDeleted,
    saunaDeleted: state.saunaDeleted,
    saunaAdded: saunaBookings.length > 0,
    spaAdded: spaBookings.length > 0,
    spaSlot: { ...state.spaSlot },
    spaBookings,
    saunaSlot: { ...state.saunaSlot },
    saunaBookings,
  };
}

function calculateTotal(snapshot) {
  let total = originalTotal;
  if (snapshot.petDeleted) total -= 5000;
  if (snapshot.saunaDeleted) total -= 16000;
  total += (snapshot.dinnerQty - originalSnapshot.dinnerQty) * 4000;
  total += (snapshot.concertQty - originalSnapshot.concertQty) * 3000;
  total += getSpaBookings(snapshot).length * 4500;
  total += getSaunaBookings(snapshot).reduce(
    (sum, booking) => sum + getSaunaPrice(booking),
    0,
  );
  return total;
}

function snapshotsEqual(current, baseline) {
  const sameServices =
    current.dinnerQty === baseline.dinnerQty &&
    current.concertQty === baseline.concertQty &&
    current.petDeleted === baseline.petDeleted &&
    current.saunaDeleted === baseline.saunaDeleted &&
    current.saunaAdded === baseline.saunaAdded &&
    current.spaAdded === baseline.spaAdded;

  if (!sameServices) return false;
  if (!sameSaunaBookings(current, baseline)) return false;
  if (!sameSpaBookings(current, baseline)) return false;
  return true;
}

function applySnapshot(state, snapshot) {
  return {
    ...state,
    dinnerQty: snapshot.dinnerQty,
    concertQty: snapshot.concertQty,
    petDeleted: snapshot.petDeleted,
    saunaDeleted: snapshot.saunaDeleted,
    saunaAdded: snapshot.saunaAdded,
    spaAdded: snapshot.spaAdded,
    spaSlot: { ...snapshot.spaSlot },
    spaBookings: getSpaBookings(snapshot).map((booking) => ({ ...booking })),
    saunaSlot: { ...snapshot.saunaSlot },
    saunaBookings: getSaunaBookings(snapshot).map((booking) => ({ ...booking })),
    saunaReplaceSource: null,
    replaceServiceId: null,
    showDelete: null,
    showLeaveConfirm: null,
    showSaunaConfig: false,
    showSpaConfig: false,
    serviceInfoId: null,
  };
}

function createInitialState() {
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const complete = params.get("scenario") === "complete";
  return {
    route: params.get("route") || "main",
    previousRoute: "main",
    showDelete: null,
    showLeaveConfirm: null,
    showSuccess: false,
    showSaunaConfig: false,
    showSpaConfig: false,
    serviceInfoId: null,
    scrollToServiceId: null,
    replaceServiceId: null,
    saunaReplaceSource: complete ? "main" : null,
    dinnerQty: complete ? 0 : 2,
    concertQty: complete ? 2 : 1,
    petDeleted: complete,
    saunaDeleted: complete,
    saunaAdded: complete,
    spaAdded: complete,
    spaSlot: {
      date: "12 ноября 2026",
      time: "13:00",
      guests: 1,
      hours: 2,
    },
    spaBookings: complete
      ? [
          {
            date: "12 ноября 2026",
            time: "13:00",
            guests: 1,
            hours: 2,
          },
        ]
      : [],
    saunaSlot: {
      date: "16 ноября 2026",
      time: "20:30",
      guests: 4,
      hours: 2,
      specialist: "Степан Родионович",
    },
    saunaBookings: complete
      ? [
          {
            date: "16 ноября 2026",
            time: "20:30",
            guests: 4,
            hours: 2,
            specialist: "Степан Родионович",
          },
        ]
      : [],
    baseline: {
      ...originalSnapshot,
      spaSlot: { ...originalSnapshot.spaSlot },
      spaBookings: originalSnapshot.spaBookings.map((booking) => ({ ...booking })),
      saunaSlot: { ...originalSnapshot.saunaSlot },
      saunaBookings: originalSnapshot.saunaBookings.map((booking) => ({ ...booking })),
    },
    log: [],
  };
}

function addLog(state, event, payload = {}) {
  const entry = {
    event,
    at: new Date().toISOString(),
    route: state.route,
    ...payload,
  };
  const nextLog = [...state.log, entry];
  window.__uxLog = nextLog;
  localStorage.setItem("bookingServicesUxLog", JSON.stringify(nextLog));
  return nextLog;
}

function AppStateReducer(setState) {
  return (event, payload = {}) => {
    setState((state) => {
      const log = addLog(state, event, payload);
      switch (event) {
        case "go":
          return {
            ...state,
            route: payload.route,
            previousRoute: state.route,
            scrollToServiceId: payload.serviceId || null,
            replaceServiceId: payload.replace ? payload.serviceId : null,
            log,
          };
        case "open-delete":
          return { ...state, showDelete: payload.serviceId, log };
        case "open-leave-confirm":
          return { ...state, showLeaveConfirm: payload.section, log };
        case "cancel-leave-confirm":
          return { ...state, showLeaveConfirm: null, log };
        case "confirm-leave":
          return { ...state, showLeaveConfirm: null, log };
        case "cancel-delete":
          return { ...state, showDelete: null, log };
        case "confirm-delete":
          if (payload.serviceId === "pet") {
            return { ...state, petDeleted: true, showDelete: null, log };
          }
          if (payload.serviceId === "sauna") {
            return {
              ...state,
              saunaDeleted: true,
              showDelete: null,
              saunaReplaceSource: state.route,
              log,
            };
          }
          return { ...state, showDelete: null, log };
        case "restore-service":
          if (payload.serviceId === "pet") {
            return { ...state, petDeleted: false, log };
          }
          if (payload.serviceId === "sauna") {
            return {
              ...state,
              saunaDeleted: false,
              saunaReplaceSource: null,
              log,
            };
          }
          return { ...state, log };
        case "set-dinner":
          return { ...state, dinnerQty: payload.qty, log };
        case "set-concert":
          return { ...state, concertQty: payload.qty, log };
        case "open-sauna-config":
          const nextSaunaSlot = getFirstAvailableSaunaSlot(state) || state.saunaSlot;
          return {
            ...state,
            showSaunaConfig: true,
            replaceServiceId: null,
            saunaSlot: {
              ...nextSaunaSlot,
              specialist: defaultSaunaSpecialist,
            },
            saunaReplaceSource: state.saunaReplaceSource || state.route,
            log,
          };
        case "close-sauna-config":
          return { ...state, showSaunaConfig: false, log };
        case "open-spa-config":
          return { ...state, showSpaConfig: true, replaceServiceId: null, log };
        case "close-spa-config":
          return { ...state, showSpaConfig: false, log };
        case "open-service-info":
          return { ...state, serviceInfoId: payload.serviceId, log };
        case "close-service-info":
          return { ...state, serviceInfoId: null, log };
        case "select-sauna-slot":
          if (payload.slot?.date) {
            const availableSlots = getAvailableSaunaSlots(state, payload.slot.date);
            if (availableSlots.length === 0) return { ...state, log };
            return {
              ...state,
              saunaSlot: {
                ...state.saunaSlot,
                ...payload.slot,
                time: availableSlots.includes(state.saunaSlot.time)
                  ? state.saunaSlot.time
                  : availableSlots[0],
              },
              log,
            };
          }
          if (
            payload.slot?.time &&
            isSaunaSlotOccupied(state, state.saunaSlot.date, payload.slot.time)
          ) {
            return { ...state, log };
          }
          return {
            ...state,
            saunaSlot: { ...state.saunaSlot, ...payload.slot },
            log,
          };
        case "select-spa-slot":
          return {
            ...state,
            spaSlot: { ...state.spaSlot, ...payload.slot },
            log,
          };
        case "add-sauna":
          if (isSaunaSlotOccupied(state, state.saunaSlot.date, state.saunaSlot.time)) {
            return { ...state, showSaunaConfig: false, log };
          }
          const saunaBooking = {
            ...state.saunaSlot,
            guests: state.saunaSlot.guests,
            hours: getSaunaHours(state.saunaSlot),
          };
          const saunaBookings = [...getSaunaBookings(state), saunaBooking];
          return {
            ...state,
            saunaAdded: true,
            saunaSlot: saunaBooking,
            saunaBookings,
            showSaunaConfig: false,
            log,
          };
        case "remove-added-sauna":
          const nextSaunaBookings =
            payload.index === undefined
              ? []
              : getSaunaBookings(state).filter((_, index) => index !== payload.index);
          return {
            ...state,
            saunaAdded: nextSaunaBookings.length > 0,
            saunaBookings: nextSaunaBookings,
            log,
          };
        case "restore-added-sauna": {
          const restoredSaunaBookings = [
            ...getSaunaBookings(state),
            {
              ...payload.booking,
              guests: payload.booking.guests,
              hours: getSaunaHours(payload.booking),
            },
          ];
          return {
            ...state,
            saunaAdded: true,
            saunaBookings: restoredSaunaBookings,
            saunaSlot: { ...payload.booking, hours: getSaunaHours(payload.booking) },
            log,
          };
        }
        case "add-spa":
          return {
            ...state,
            spaAdded: true,
            spaBookings: [
              ...getSpaBookings(state),
              {
                ...state.spaSlot,
                guests: 1,
                hours: 2,
              },
            ],
            showSpaConfig: false,
            log,
          };
        case "remove-spa": {
          const nextBookings =
            payload.index === undefined
              ? []
              : getSpaBookings(state).filter((_, index) => index !== payload.index);
          return {
            ...state,
            spaAdded: nextBookings.length > 0,
            spaBookings: nextBookings,
            log,
          };
        }
        case "restore-spa": {
          const nextBookings = [
            ...getSpaBookings(state),
            {
              ...payload.booking,
              guests: 1,
              hours: 2,
            },
          ];
          return {
            ...state,
            spaAdded: true,
            spaBookings: nextBookings,
            spaSlot: { ...payload.booking, guests: 1, hours: 2 },
            log,
          };
        }
        case "reset":
          return { ...applySnapshot(state, state.baseline), route: state.route, log };
        case "save": {
          const baseline = getSnapshot(state);
          return {
            ...state,
            baseline,
            route: "main",
            previousRoute: "confirm",
            showSuccess: true,
            showDelete: null,
            showLeaveConfirm: null,
            showSaunaConfig: false,
            showSpaConfig: false,
            saunaReplaceSource: null,
            replaceServiceId: null,
            log,
          };
        }
        case "close-success":
          return { ...state, showSuccess: false, route: "main", log };
        default:
          return { ...state, log };
      }
    });
  };
}

export function App() {
  const [state, setState] = useState(createInitialState);
  const act = AppStateReducer(setState);
  const totals = useTotals(state);

  useEffect(() => {
    let clearFocusTimer;
    const frame = window.requestAnimationFrame(() => {
      if (state.route === "services" && state.scrollToServiceId) {
        const target = document.getElementById(
          `service-card-${state.scrollToServiceId}`,
        );
        if (target) {
          target.scrollIntoView({
            block: "center",
            inline: "nearest",
            behavior: "auto",
          });
          target.focus({ preventScroll: true });
          clearFocusTimer = window.setTimeout(() => {
            if (document.activeElement === target) {
              target.blur();
            }
          }, serviceFocusTimeoutMs);
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (clearFocusTimer) {
        window.clearTimeout(clearFocusTimer);
      }
    };
  }, [state.route, state.scrollToServiceId]);

  return (
    <div className="app-shell">
      <TopBar state={state} act={act} />
      {state.route === "main" && (
        <BookingDetails state={state} act={act} totals={totals} />
      )}
      {state.route === "services" && (
        <AllServices state={state} act={act} totals={totals} />
      )}
      {state.route === "confirm" && (
        <ConfirmChanges state={state} act={act} totals={totals} />
      )}
      {totals.hasChanges && state.route !== "confirm" && (
        <ChangeBar state={state} act={act} totals={totals} />
      )}
      {state.showDelete && (
        <DeleteModal state={state} act={act} totals={totals} />
      )}
      {state.showLeaveConfirm && (
        <LeaveChangesModal state={state} act={act} totals={totals} />
      )}
      {state.showSaunaConfig && <SaunaConfig state={state} act={act} />}
      {state.showSpaConfig && <SpaConfig state={state} act={act} />}
      {state.serviceInfoId && (
        <ServiceInfoModal
          service={availableServices.find((item) => item.id === state.serviceInfoId)}
          act={act}
        />
      )}
      {state.showSuccess && <SuccessModal act={act} totals={totals} />}
    </div>
  );
}

function useTotals(state) {
  return useMemo(() => {
    const current = getSnapshot(state);
    const baseline = state.baseline || originalSnapshot;
    const total = calculateTotal(current);
    const baseTotal = calculateTotal(baseline);
    return {
      total,
      baseTotal,
      hasChanges: !snapshotsEqual(current, baseline),
    };
  }, [state]);
}

function TopBar({ state, act }) {
  const title =
    state.route === "services"
      ? "Услуги на время проживания"
      : state.route === "confirm"
        ? "Подтверждение изменений"
        : "Детали бронирования";
  return (
    <header className="topbar">
      {state.route !== "main" && (
        <button
          className="link-button back-button"
          onClick={() =>
            act("go", {
              route: state.route === "services" ? "main" : state.previousRoute || "main",
            })
          }
        >
          <ArrowLeft size={18} /> Назад
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}

function BookingDetails({ state, act, totals }) {
  return (
    <main className="page booking-page">
      <HotelSummary totals={totals} />
      <div className="booking-layout">
        <SideNav act={act} totals={totals} />
        <RoomServices
          state={state}
          act={act}
          totals={totals}
          mode="main"
        />
      </div>
    </main>
  );
}

function HotelSummary({ totals }) {
  return (
    <section className="hotel-card">
      <div className="hotel-head">
        <img className="hotel-logo" src={images.hotelLogo} alt="" />
        <div>
          <h2>Country Club Nevarest</h2>
          <a className="address" href="#">
            <MapPin size={18} /> 190121, Россия, г. Зеленогорск, ул. Гаванная,
            стр. 166 <ExternalLink size={14} />
          </a>
        </div>
      </div>
      <div className="hotel-meta">
        <div>
          <p>
            Дата проживания: <b>12 ноября — 18 ноября 2025 г.</b>
          </p>
          <p>
            Общая стоимость: <b>{money.format(totals.total)} ₽</b>
          </p>
          <p>
            Подтверждение отправлено на Email: <b>ivanov@mail.com</b>
          </p>
        </div>
        <button className="secondary-button icon-text">
          <Download size={18} /> Скачать подтверждение
        </button>
      </div>
    </section>
  );
}

function SideNav({ act, totals }) {
  const items = [
    "Даты проживания",
    "Номера и тарифы",
    "Услуги",
    "Контактное лицо",
    "Отмена бронирования",
    "Стоимость бронирования",
  ];
  return (
    <nav className="side-nav">
      {items.map((item) => (
        <button
          className={item === "Услуги" ? "active" : ""}
          key={item}
          onClick={() => {
            if (item !== "Услуги" && totals.hasChanges) {
              act("open-leave-confirm", { section: item });
            }
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

function RoomServices({ state, act, mode }) {
  return (
    <section className="room-card">
      <div className="room-header">
        <h2>Услуги номера: Люкс</h2>
        <p>2 взрослых</p>
      </div>
      <div className="room-body">
        <h3>Уже включено</h3>
        <IncludedCarousel act={act} />
        <h3>Добавлено вами</h3>
        <FixedDateNotice />
        <PurchasedList state={state} act={act} compact={mode === "main"} />
        <h3>Сделайте проживание комфортнее</h3>
        <PromoCarousel act={act} />
      </div>
    </section>
  );
}

function FixedDateNotice() {
  return (
    <div className="fixed-date-notice">
      <PencilLine className="fixed-date-notice-icon" aria-hidden="true" />
      <span>
        Услуги на конкретную дату нельзя изменить напрямую&nbsp;— сначала удалите услугу, а&nbsp;а затем настройте её заново
      </span>
    </div>
  );
}

function IncludedCarousel({ act }) {
  const rowRef = useRef(null);
  const carousel = useCarouselControls(rowRef);
  return (
    <div
      className={`carousel-shell ${carousel.canScroll ? "" : "no-scroll"} ${
        carousel.canGoPrev ? "has-prev" : ""
      } ${carousel.canGoNext ? "has-next" : ""}`}
    >
      <div className="included-row" ref={rowRef}>
        {includedServices.map((service) => (
          <article className="included-card" key={service.id}>
            <img src={service.image} alt="" />
            <div>
              <b>{service.title}</b>
              <span>{service.subtitle}</span>
            </div>
            <button
              className="round-button small"
              onClick={() => act("open-service-info", { serviceId: service.id })}
              {...iconActionLabel("Открыть подробности")}
            >
              <ExternalLink size={15} />
            </button>
          </article>
        ))}
      </div>
      <button
        className="round-button carousel-prev"
        aria-hidden={!carousel.canGoPrev}
        title="Прокрутить назад"
        onClick={() => rowRef.current?.scrollBy({ left: -220, behavior: "smooth" })}
      >
        <ChevronRight size={24} />
      </button>
      <button
        className="round-button carousel-next"
        aria-hidden={!carousel.canGoNext}
        title="Прокрутить вперед"
        onClick={() => rowRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

function PurchasedList({ state, act }) {
  const baseline = state.baseline || originalSnapshot;
  const originalSaunaStatus = state.saunaDeleted
    ? baseline.saunaDeleted
      ? null
      : "deleted"
    : baseline.saunaDeleted
      ? "added"
      : null;
  const petStatus = state.petDeleted
    ? baseline.petDeleted
      ? null
      : "deleted"
    : baseline.petDeleted
      ? "added"
      : null;
  const dinnerBasePrice = baseline.dinnerQty * 4000;
  const dinnerCurrentPrice = state.dinnerQty * 4000;
  const dinnerStatus =
    state.dinnerQty === 0 && baseline.dinnerQty > 0
      ? "deleted"
      : state.dinnerQty > 0 && baseline.dinnerQty === 0
        ? "added"
        : state.dinnerQty !== baseline.dinnerQty
          ? "changed"
          : null;
  const dinnerDisplayQty = getSimpleServiceDisplayQty(
    state.dinnerQty,
    baseline.dinnerQty,
  );
  const concertBasePrice = baseline.concertQty * 3000;
  const concertCurrentPrice = state.concertQty * 3000;
  const concertStatus =
    state.concertQty === 0 && baseline.concertQty > 0
      ? "deleted"
      : state.concertQty > 0 && baseline.concertQty === 0
        ? "added"
        : state.concertQty !== baseline.concertQty
          ? "changed"
          : null;
  const concertDisplayQty = getSimpleServiceDisplayQty(
    state.concertQty,
    baseline.concertQty,
  );
  const saunaBookings = getSaunaBookings(state);
  const baselineSaunaBookings = getSaunaBookings(baseline);
  const saunaRowsCount = Math.max(saunaBookings.length, baselineSaunaBookings.length);
  const spaBookings = getSpaBookings(state);
  const baselineSpaBookings = getSpaBookings(baseline);
  const spaRowsCount = Math.max(spaBookings.length, baselineSpaBookings.length);
  const chooseAnotherTime = (serviceId) => (
    <button
      className="secondary-button row-secondary-button"
      onClick={() =>
        act("go", { route: "services", serviceId, replace: true })
      }
    >
      Настроить заново
    </button>
  );

  return (
    <div className="purchased-list">
      {!(state.saunaDeleted && baseline.saunaDeleted) && (
        <PurchasedRow
          id="sauna"
          title="Баня с пармастером"
          image={images.sauna}
          details="16 ноября 2026 • 18:30 • 4 гостя • 2 часа"
          price={16000}
          status={originalSaunaStatus}
          action={
            state.saunaDeleted ? (
              <div className="row-action-group">
                {chooseAnotherTime("sauna-master")}
                <button
                  className="icon-button"
                  onClick={() => act("restore-service", { serviceId: "sauna" })}
                  {...iconActionLabel("Вернуть")}
                >
                  <RotateCcw size={22} />
                </button>
              </div>
            ) : (
              <button
                className="icon-button"
                onClick={() => act("confirm-delete", { serviceId: "sauna" })}
                {...iconActionLabel("Удалить")}
              >
                <Trash2 size={22} />
              </button>
            )
          }
        />
      )}
      {!(state.petDeleted && baseline.petDeleted) && (
        <PurchasedRow
          id="pet"
          title="Проживание с животным"
          image={images.pet}
          details="1 шт."
          price={5000}
          status={petStatus}
          action={
            state.petDeleted ? (
              <button
                className="icon-button"
                onClick={() => act("restore-service", { serviceId: "pet" })}
                {...iconActionLabel("Вернуть")}
              >
                <RotateCcw size={22} />
              </button>
            ) : (
              <button
                className="icon-button"
                onClick={() => act("confirm-delete", { serviceId: "pet" })}
                {...iconActionLabel("Удалить")}
              >
                <Trash2 size={22} />
              </button>
            )
          }
        />
      )}
      {!(state.dinnerQty === 0 && baseline.dinnerQty === 0) && (
        <PurchasedRow
          id="dinner"
          title="Романтический ужин"
          image={images.dinner}
          details={formatGuestCount(dinnerDisplayQty)}
          price={dinnerStatus === "added" ? dinnerCurrentPrice : dinnerStatus ? dinnerBasePrice : dinnerCurrentPrice}
          newPrice={dinnerStatus === "changed" ? dinnerCurrentPrice : undefined}
          status={dinnerStatus}
          action={
            dinnerStatus === "deleted" ? (
              <button
                className="icon-button"
                onClick={() => act("set-dinner", { qty: baseline.dinnerQty })}
                {...iconActionLabel("Вернуть")}
              >
                <RotateCcw size={22} />
              </button>
            ) : (
              <Stepper
                value={state.dinnerQty}
                min={0}
                max={2}
                onChange={(qty) => act("set-dinner", { qty })}
              />
            )
          }
        />
      )}
      {!(state.concertQty === 0 && baseline.concertQty === 0) && (
        <PurchasedRow
          id="concert"
          title="Концерт Las Palmas на террасе Club Nevarest"
          image={images.concert}
          details={formatGuestCount(concertDisplayQty)}
          price={concertStatus === "added" ? concertCurrentPrice : concertStatus ? concertBasePrice : concertCurrentPrice}
          newPrice={concertStatus === "changed" ? concertCurrentPrice : undefined}
          status={concertStatus}
          action={
            concertStatus === "deleted" ? (
              <button
                className="icon-button"
                onClick={() => act("set-concert", { qty: baseline.concertQty })}
                {...iconActionLabel("Вернуть")}
              >
                <RotateCcw size={22} />
              </button>
            ) : (
              <Stepper
                value={state.concertQty}
                min={0}
                max={2}
                onChange={(qty) => act("set-concert", { qty })}
              />
            )
          }
        />
      )}
      {Array.from({ length: saunaRowsCount }).map((_, index) => {
        const booking = saunaBookings[index];
        const baselineBooking = baselineSaunaBookings[index];
        const visibleBooking = booking || baselineBooking;
        const status = booking
          ? baselineBooking && sameSaunaBooking(booking, baselineBooking)
            ? null
            : "added"
          : "deleted";

        return (
          <PurchasedRow
            id={`sauna-added-${index}`}
            key={`sauna-added-${index}`}
            title="Баня с пармастером"
            image={images.sauna}
            details={`${visibleBooking.date} • ${visibleBooking.time} • ${visibleBooking.guests} гостя • ${getSaunaHours(visibleBooking)} часа`}
            price={getSaunaPrice(visibleBooking)}
            status={status}
            action={
              booking ? (
                <button
                  className="icon-button"
                  onClick={() => act("remove-added-sauna", { index })}
                  {...iconActionLabel("Удалить")}
                >
                  <Trash2 size={22} />
                </button>
              ) : (
                <div className="row-action-group">
                  {chooseAnotherTime("sauna-master")}
                  <button
                    className="icon-button"
                    onClick={() => act("restore-added-sauna", { booking: baselineBooking })}
                    {...iconActionLabel("Вернуть")}
                  >
                    <RotateCcw size={22} />
                  </button>
                </div>
              )
            }
          />
        );
      })}
      {Array.from({ length: spaRowsCount }).map((_, index) => {
        const booking = spaBookings[index];
        const baselineBooking = baselineSpaBookings[index];
        const visibleBooking = booking || baselineBooking;
        const status = booking
          ? baselineBooking && sameSpaBooking(booking, baselineBooking)
            ? null
            : "added"
          : "deleted";

        return (
          <PurchasedRow
            id={`spa-${index}`}
            key={`spa-${index}`}
            title='Авторская СПА программа "Турецкий шарм"'
            image={images.spa}
            details={`${visibleBooking.date} • ${visibleBooking.time} • 1 гость • 2 часа`}
            price={4500}
            status={status}
            action={
              booking ? (
                <button
                  className="icon-button"
                  onClick={() => act("remove-spa", { serviceId: "spa", index })}
                  {...iconActionLabel("Удалить")}
                >
                  <Trash2 size={22} />
                </button>
              ) : (
                <div className="row-action-group">
                  {chooseAnotherTime("spa")}
                  <button
                    className="icon-button"
                    onClick={() => act("restore-spa", { booking: baselineBooking })}
                    {...iconActionLabel("Вернуть")}
                  >
                    <RotateCcw size={22} />
                  </button>
                </div>
              )
            }
          />
        );
      })}
    </div>
  );
}

function PurchasedRow({
  title,
  image,
  details,
  price,
  newPrice,
  status,
  action,
}) {
  return (
    <article className={`purchased-row ${status || ""}`}>
      <div className="status-slot">
        {status === "deleted" && <span className="tag danger">Удалено</span>}
        {status === "changed" && (
          <span className="tag warning">Пересчитано</span>
        )}
        {status === "added" && <span className="tag success">Добавлено</span>}
      </div>
      <img src={image} alt="" />
      <div className="row-main">
        <b className="row-title">{title}</b>
        <span className="row-details">{details}</span>
      </div>
      <div className="row-action">{action}</div>
      <div className="row-price">
        {newPrice ? (
          <>
            <span className="delta">↑</span>
            <s>{money.format(price)} ₽</s>
            <b>{money.format(newPrice)} ₽</b>
          </>
        ) : (
          <span className={status === "deleted" ? "muted strike" : ""}>
            {money.format(price)} ₽
          </span>
        )}
      </div>
    </article>
  );
}

function Stepper({ value, min, max, onChange }) {
  return (
    <div className="stepper">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        {...iconActionLabel("Уменьшить")}
      >
        <Minus size={18} />
      </button>
      <span>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        {...iconActionLabel("Увеличить")}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}

function PromoCarousel({ act }) {
  const rowRef = useRef(null);
  const carousel = useCarouselControls(rowRef);
  const promo = [
    availableServices.find((item) => item.id === "massage"),
    availableServices.find((item) => item.id === "sauna-wood"),
    availableServices.find((item) => item.id === "boat"),
  ];
  const openServiceInCatalog = (serviceId) =>
    act("go", { route: "services", serviceId });
  const handlePromoKeyDown = (event, serviceId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openServiceInCatalog(serviceId);
    }
  };

  return (
    <>
      <div
        className={`carousel-shell promo-shell ${
          carousel.canScroll ? "" : "no-scroll"
        } ${carousel.canGoPrev ? "has-prev" : ""} ${
          carousel.canGoNext ? "has-next" : ""
        }`}
      >
        <div className="promo-row" ref={rowRef}>
          {promo.map((service) => (
            <article
              className="promo-card"
              key={service.id}
              role="button"
              tabIndex={0}
              onClick={() => openServiceInCatalog(service.id)}
              onKeyDown={(event) => handlePromoKeyDown(event, service.id)}
              aria-label={`Открыть услугу ${service.title} в каталоге`}
            >
              <img src={service.image} alt="" />
              <a>{service.title}</a>
              <span className="service-meta">
                <Users size={14} /> {service.footer.split("•")[0].trim()}
                <Clock3 size={14} /> {service.footer.split("•")[1]?.trim()}
              </span>
              <p>
                от <b>{money.format(service.price)} ₽</b>
              </p>
            </article>
          ))}
          <button
            className="promo-cta-card"
            onClick={() => act("go", { route: "services" })}
          >
            <span>Смотреть остальные услуги</span>
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          className="round-button carousel-prev"
          aria-hidden={!carousel.canGoPrev}
          title="Прокрутить назад"
          onClick={() =>
            rowRef.current?.scrollBy({ left: -260, behavior: "smooth" })
          }
        >
          <ChevronRight size={24} />
        </button>
        <button
          className="round-button carousel-next"
          aria-hidden={!carousel.canGoNext}
          title="Прокрутить вперед"
          onClick={() =>
            rowRef.current?.scrollBy({ left: 260, behavior: "smooth" })
          }
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <button
        className="primary-button full"
        onClick={() => act("go", { route: "services" })}
      >
        Выбрать услуги <ChevronRight size={20} />
      </button>
    </>
  );
}

function useCarouselControls(rowRef) {
  const [state, setState] = useState({
    canScroll: false,
    canGoPrev: false,
    canGoNext: false,
  });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;

    const update = () => {
      const maxScroll = row.scrollWidth - row.clientWidth;
      setState({
        canScroll: maxScroll > 1,
        canGoPrev: row.scrollLeft > 1,
        canGoNext: row.scrollLeft < maxScroll - 1,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(row);
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [rowRef]);

  return state;
}

function AllServices({ state, act, totals }) {
  const grouped = availableServices.reduce((acc, service) => {
    acc[service.category] ||= [];
    acc[service.category].push(service);
    return acc;
  }, {});
  return (
    <main className="page services-page">
      <section className="services-list">
        {Object.entries(grouped).map(([category, items]) => (
          <div className="service-section" key={category}>
            <h2>{category}</h2>
            {items.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                state={state}
                act={act}
              />
            ))}
          </div>
        ))}
      </section>
      {totals.hasChanges && <div className="bottom-spacer" />}
    </main>
  );
}

function ServiceCard({ service, state, act }) {
  const isDinner = service.id === "dinner";
  const isConcert = service.id === "concert";
  const isPet = service.id === "pet";
  const isSauna = service.id === "sauna-master";
  const isSpa = service.id === "spa";
  const replaceMode = state.replaceServiceId === service.id;
  const activeSauna = isSauna && !state.saunaDeleted;
  const deletedSauna = isSauna && state.saunaDeleted;
  const saunaBookings = getSaunaBookings(state);
  const addedSauna = isSauna && saunaBookings.length > 0;
  const saunaRows = isSauna
    ? [
        ...(activeSauna
          ? [{ ...originalSnapshot.saunaSlot, source: "original", price: 16000 }]
          : []),
        ...saunaBookings.map((booking, index) => ({
          ...booking,
          source: "added",
          index,
          price: getSaunaPrice(booking),
        })),
      ]
    : [];
  const spaBookings = getSpaBookings(state);
  const activeSpa = isSpa && spaBookings.length > 0;
  const simpleQty = isDinner
    ? state.dinnerQty
    : isConcert
      ? state.concertQty
      : 0;
  const selected =
    service.included ||
    (!replaceMode && activeSauna) ||
    (!replaceMode && addedSauna) ||
    (isDinner && state.dinnerQty > 0) ||
    (isConcert && state.concertQty > 0) ||
    (isPet && !state.petDeleted) ||
    (!replaceMode && activeSpa);
  const hourlySelected =
    !replaceMode && ((isSauna && saunaRows.length > 0) || activeSpa);
  const hourlyFooterTitle = isSpa
    ? spaBookings.length > 1
      ? `${spaBookings.length} записи • 1 гость • 2 часа`
      : "1 гость • 2 часа"
    : addedSauna
      ? `${saunaBookings[0]?.guests || state.saunaSlot.guests} гостя • ${getSaunaHours(saunaBookings[0] || state.saunaSlot)} часа`
      : "4 гостя • 2 часа";
  const hourlyFooterDetails = isSpa
    ? spaBookings.length > 1
      ? `${spaBookings[0].date} • ${spaBookings[0].time} и еще ${spaBookings.length - 1}`
      : `${spaBookings[0]?.date || state.spaSlot.date} • ${spaBookings[0]?.time || state.spaSlot.time}`
    : addedSauna
      ? `${saunaBookings[0]?.date || state.saunaSlot.date} • ${saunaBookings[0]?.time || state.saunaSlot.time} • ${saunaBookings[0]?.specialist || state.saunaSlot.specialist}`
      : "16 ноября 2026 • 18:30 • Степан Родионович";
  const footerText =
    isDinner || isConcert
      ? simpleQty > 0
        ? `Для ${simpleQty} ${simpleQty === 1 ? "гостя" : "гостей"}`
        : service.footer
      : service.footer;
  const openInfo = () => act("open-service-info", { serviceId: service.id });
  const handleInfoKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInfo();
    }
  };

  return (
    <article
      id={`service-card-${service.id}`}
      className={`service-card ${selected ? "selected" : ""} ${hourlySelected ? "hourly-selected" : ""}`}
      tabIndex={-1}
    >
      <img src={service.image} alt="" />
      <div className="service-content">
        <div
          className="service-info-zone"
          role="button"
          tabIndex={0}
          onClick={openInfo}
          onKeyDown={handleInfoKeyDown}
          aria-label={`Открыть описание услуги ${service.title}`}
        >
          <div className="service-title-row">
            <a>{service.title}</a>
            <button
              className="square-link"
              {...iconActionLabel("Открыть подробности")}
              onClick={(event) => {
                event.stopPropagation();
                openInfo();
              }}
            >
              <ExternalLink size={16} />
            </button>
          </div>
          {service.hourly && (
            <div className="service-card-meta">
              {service.footer.split("•").map((item, index) => (
                <span key={item.trim()}>
                  {index === 0 ? <Users size={16} /> : <Clock3 size={16} />}
                  {item.trim()}
                </span>
              ))}
            </div>
          )}
          <p>{service.description}</p>
          {!replaceMode && (activeSauna || addedSauna || activeSpa) && (
            <div className="booked-inline">
              <span>
                {activeSpa
                  ? spaBookings.length > 1
                    ? `${spaBookings[0].date} • ${spaBookings[0].time} и еще ${spaBookings.length - 1}`
                    : `${spaBookings[0].date} • ${spaBookings[0].time}`
                  : activeSauna
                  ? "16 ноября 2026 • 18:30 • Степан Родионович"
                  : `${state.saunaSlot.date} • ${state.saunaSlot.time} • ${state.saunaSlot.specialist}`}
              </span>
            </div>
          )}
        </div>
        {hourlySelected && (
          <button
            className="more-service inline-more-service"
            onClick={() => act(isSpa ? "open-spa-config" : "open-sauna-config")}
          >
            <Plus size={16} /> Еще
          </button>
        )}
      </div>
      <div className={`service-footer ${service.included ? "included-footer" : ""}`}>
        {isSauna && hourlySelected ? (
          <div className="hourly-booking-list">
            {saunaRows.map((booking) => (
              <div
                className="hourly-booking-row"
                key={`${booking.source}-${booking.date}-${booking.time}-${booking.index ?? "base"}`}
              >
                <span>
                  <b>
                    {booking.guests} гостя • {getSaunaHours(booking)} часа
                  </b>
                  <small>
                    {booking.date} • {booking.time} • {booking.specialist}
                  </small>
                </span>
                <strong>{money.format(booking.price)} ₽</strong>
                <button
                  className="icon-button filled"
                  onClick={() =>
                    booking.source === "original"
                      ? act("confirm-delete", { serviceId: "sauna" })
                      : act("remove-added-sauna", { index: booking.index })
                  }
                  {...iconActionLabel("Удалить")}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span>
            {hourlySelected ? (
              <>
                <b>{hourlyFooterTitle}</b>
                <small>{hourlyFooterDetails}</small>
              </>
            ) : (
              footerText
            )}
          </span>
        )}
        {!(isSauna && hourlySelected) && (
        <div className="service-price-action">
          {service.included ? (
            <span className="included-badge">
              <Check size={14} /> Услуга включена
            </span>
          ) : isDinner || isConcert ? (
            simpleQty > 0 ? (
              <>
                <span>{money.format(service.price * simpleQty)} ₽</span>
                <Stepper
                  value={simpleQty}
                  min={0}
                  max={2}
                  onChange={(qty) =>
                    act(isDinner ? "set-dinner" : "set-concert", { qty })
                  }
                />
              </>
            ) : (
              <>
                <span>от {money.format(service.price)} ₽</span>
                <button
                  className="primary-button small"
                  onClick={() =>
                    act(isDinner ? "set-dinner" : "set-concert", { qty: 1 })
                  }
                >
                  Добавить
                </button>
              </>
            )
          ) : isPet && !state.petDeleted ? (
            <>
              <span>{money.format(service.price)} ₽</span>
              <button
                className="secondary-button"
                onClick={() => act("confirm-delete", { serviceId: "pet" })}
              >
                Отменить
              </button>
            </>
          ) : isPet && state.petDeleted ? (
            <>
              <span>от {money.format(service.price)} ₽</span>
              <button
                className="primary-button small"
                onClick={() => act("restore-service", { serviceId: "pet" })}
              >
                Добавить
              </button>
            </>
          ) : replaceMode && (isSauna || isSpa) ? (
            <>
              <span>от {money.format(service.price)} ₽</span>
              <button
                className="primary-button small"
                onClick={() =>
                  act(isSpa ? "open-spa-config" : "open-sauna-config")
                }
              >
                Забронировать
              </button>
            </>
          ) : activeSauna ? (
            <>
              <span>{money.format(service.price)} ₽</span>
              <button
                className="icon-button filled"
                onClick={() => act("confirm-delete", { serviceId: "sauna" })}
                {...iconActionLabel("Удалить")}
              >
                <Trash2 size={18} />
              </button>
            </>
          ) : deletedSauna && !addedSauna ? (
            <>
              <span>от {money.format(service.price)} ₽</span>
              <button
                className="primary-button small"
                onClick={() => act("open-sauna-config")}
              >
                Добавить
              </button>
            </>
          ) : addedSauna ? (
            <>
              <span>{money.format(saunaBookings.reduce((sum, booking) => sum + getSaunaPrice(booking), 0))} ₽</span>
              <button
                className="icon-button filled"
                onClick={() => act("remove-added-sauna")}
                {...iconActionLabel("Удалить")}
              >
                <Trash2 size={18} />
              </button>
            </>
          ) : activeSpa ? (
            <>
              <span>{money.format(service.price * spaBookings.length)} ₽</span>
              <button
                className="icon-button filled"
                onClick={() => act("remove-spa", { serviceId: "spa" })}
                {...iconActionLabel("Удалить")}
              >
                <Trash2 size={18} />
              </button>
            </>
          ) : (
            <>
              <span>
                {service.price ? `от ${money.format(service.price)} ₽` : ""}
              </span>
              <button
                className="primary-button small"
                onClick={() =>
                  isSpa
                    ? act("open-spa-config")
                    : service.hourly
                      ? act("open-sauna-config")
                      : act("noop", { serviceId: service.id })
                }
              >
                Добавить
              </button>
            </>
          )}
        </div>
        )}
        {hourlySelected && (
          <button
            className="more-service footer-more-service"
            onClick={() => act(isSpa ? "open-spa-config" : "open-sauna-config")}
          >
            <Plus size={16} /> Еще
          </button>
        )}
      </div>
    </article>
  );
}

function ServiceInfoModal({ service, act }) {
  if (!service) return null;

  return (
    <div className="overlay">
      <section className="modal service-info-modal">
        <button
          className="close-button"
          onClick={() => act("close-service-info")}
          {...iconActionLabel("Закрыть")}
        >
          <X size={18} />
        </button>
        <img className="service-info-hero" src={service.image} alt="" />
        <div className="service-info-body">
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
        <div className="modal-actions">
          <button
            className="secondary-button"
            onClick={() => act("close-service-info")}
          >
            Закрыть
          </button>
        </div>
      </section>
    </div>
  );
}

function ChangeBar({ act, totals }) {
  return (
    <aside className="change-bar">
      <button className="secondary-button" onClick={() => act("reset")}>
        Сбросить
      </button>
      <div className="bar-total">
        <s>{money.format(totals.baseTotal)} ₽</s>
        <b>{money.format(totals.total)} ₽</b>
      </div>
      <button
        className="primary-button"
        onClick={() => act("go", { route: "confirm" })}
      >
        Продолжить
      </button>
    </aside>
  );
}

function DeleteModal({ state, act, totals }) {
  const serviceName =
    state.showDelete === "pet"
      ? "проживание с животным"
      : "баню с пармастером";
  const delta = state.showDelete === "pet" ? 5000 : 16000;
  return (
    <div className="overlay">
      <section className="modal delete-modal">
        <div className="modal-illustration">
          <div />
        </div>
        <h2>Продолжить изменения услуг?</h2>
        <p>
          Вы изменили список услуг. Стоимость бронирования изменится:
          <br />
          <b>
            {money.format(totals.total)} ₽ →{" "}
            {money.format(totals.total - delta)} ₽
          </b>
        </p>
        <p className="modal-note">Будет удалено: {serviceName}</p>
        <div className="modal-actions">
          <button
            className="secondary-button"
            onClick={() => act("cancel-delete")}
          >
            Сбросить
          </button>
          <button
            className="primary-button"
            onClick={() =>
              act("confirm-delete", { serviceId: state.showDelete })
            }
          >
            Продолжить
          </button>
        </div>
      </section>
    </div>
  );
}

function LeaveChangesModal({ state, act, totals }) {
  return (
    <div className="overlay">
      <section className="modal delete-modal">
        <div className="modal-illustration">
          <div />
        </div>
        <h2>Продолжить изменения услуг?</h2>
        <p>
          Вы изменили список услуг. Стоимость бронирования изменится:
          <br />
          <b>
            {money.format(totals.baseTotal)} ₽ → {money.format(totals.total)} ₽
          </b>
        </p>
        <p className="modal-note">
          Переход в раздел «{state.showLeaveConfirm}» будет доступен после
          подтверждения или сброса изменений.
        </p>
        <div className="modal-actions">
          <button className="secondary-button" onClick={() => act("reset")}>
            Сбросить
          </button>
          <button
            className="primary-button"
            onClick={() => act("confirm-leave")}
          >
            Продолжить
          </button>
        </div>
      </section>
    </div>
  );
}

function SaunaConfig({ state, act }) {
  const slots = getAvailableSaunaSlots(state, state.saunaSlot.date);
  const saunaPrice = getSaunaPrice(state.saunaSlot);
  return (
    <div className="overlay panel-overlay">
      <section className="modal config-modal">
        <button
          className="close-button"
          onClick={() => act("close-sauna-config")}
          {...iconActionLabel("Закрыть")}
        >
          <X size={18} />
        </button>
        <ServicePreview service={availableServices.find((s) => s.id === "sauna-master")} />
        <div className="config-body">
          <h3>Дата и время</h3>
          <div className="calendar-heading">
            <span>Ноябрь 2026</span>
          </div>
          <div className="calendar-strip">
            {saunaDates.map((date) => {
              const disabled = getAvailableSaunaSlots(state, date.value).length === 0;
              return (
                <button
                  key={date.value}
                  className={date.value === state.saunaSlot.date ? "active" : ""}
                  disabled={disabled}
                  onClick={() =>
                    act("select-sauna-slot", {
                      slot: { date: date.value },
                    })
                  }
                >
                  <span>{date.weekday}</span>
                  <b>{date.day}</b>
                </button>
              );
            })}
          </div>
          <div className="time-slots">
            {slots.map((slot) => (
              <button
                key={slot}
                className={slot === state.saunaSlot.time ? "active" : ""}
                onClick={() =>
                  act("select-sauna-slot", {
                    slot: { time: slot },
                  })
                }
              >
                {slot}
              </button>
            ))}
            {slots.length === 0 && (
              <span className="empty-slots">Нет свободного времени</span>
            )}
          </div>
          <h3>Специалист</h3>
          <div className="specialists">
            {saunaSpecialists.map((name) => (
              <button
                key={name}
                className={name === state.saunaSlot.specialist ? "active" : ""}
                onClick={() =>
                  act("select-sauna-slot", { slot: { specialist: name } })
                }
              >
                <span className="avatar">{name[0]}</span>
                {name}
              </button>
            ))}
          </div>
          <h3>Дополнительно</h3>
          <div className="extra-lines">
            <div>
              <span>Продлить услугу</span>
              <b>3 000 ₽ за 1 час</b>
              <Stepper
                value={getSaunaHours(state.saunaSlot) - 2}
                min={0}
                max={2}
                onChange={(value) =>
                  act("select-sauna-slot", { slot: { hours: value + 2 } })
                }
              />
            </div>
            <div>
              <span>Добавить еще гостей</span>
              <b>1 000 ₽</b>
              <Stepper
                value={state.saunaSlot.guests - 4}
                min={0}
                max={2}
                onChange={(value) =>
                  act("select-sauna-slot", { slot: { guests: value + 4 } })
                }
              />
            </div>
          </div>
        </div>
        <div className="config-footer">
          <span>
            {state.saunaSlot.guests} гостя • {getSaunaHours(state.saunaSlot)} часа
          </span>
          <b>{money.format(saunaPrice)} ₽</b>
          <button className="primary-button" onClick={() => act("add-sauna")}>
            Добавить
          </button>
        </div>
      </section>
    </div>
  );
}

function SpaConfig({ state, act }) {
  const slots = ["11:00", "13:00", "15:30", "18:30"];
  const dates = [
    { day: "12", weekday: "Чт", value: "12 ноября 2026" },
    { day: "13", weekday: "Пт", value: "13 ноября 2026" },
    { day: "14", weekday: "Сб", value: "14 ноября 2026" },
    { day: "15", weekday: "Вс", value: "15 ноября 2026" },
    { day: "16", weekday: "Пн", value: "16 ноября 2026" },
    { day: "17", weekday: "Вт", value: "17 ноября 2026" },
    { day: "18", weekday: "Ср", value: "18 ноября 2026" },
  ];
  return (
    <div className="overlay panel-overlay">
      <section className="modal config-modal">
        <button
          className="close-button"
          onClick={() => act("close-spa-config")}
          {...iconActionLabel("Закрыть")}
        >
          <X size={18} />
        </button>
        <ServicePreview service={availableServices.find((s) => s.id === "spa")} />
        <div className="config-body">
          <h3>Дата и время</h3>
          <div className="calendar-heading">
            <span>Ноябрь 2026</span>
          </div>
          <div className="calendar-strip">
            {dates.map((date) => (
              <button
                key={date.value}
                className={date.value === state.spaSlot.date ? "active" : ""}
                onClick={() =>
                  act("select-spa-slot", {
                    slot: { date: date.value },
                  })
                }
              >
                <span>{date.weekday}</span>
                <b>{date.day}</b>
              </button>
            ))}
          </div>
          <div className="time-slots">
            {slots.map((slot) => (
              <button
                key={slot}
                className={slot === state.spaSlot.time ? "active" : ""}
                onClick={() =>
                  act("select-spa-slot", {
                    slot: { time: slot },
                  })
                }
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div className="config-footer">
          <span>1 гость • 2 часа</span>
          <b>{money.format(4500)} ₽</b>
          <button className="primary-button" onClick={() => act("add-spa")}>
            Добавить
          </button>
        </div>
      </section>
    </div>
  );
}

function ServicePreview({ service }) {
  return (
    <article className="config-preview">
      <img src={service.image} alt="" />
      <div>
        <a>{service.title}</a>
        <p>{service.description}</p>
        <span>{service.footer}</span>
      </div>
    </article>
  );
}

function ConfirmChanges({ state, act, totals }) {
  const baseline = state.baseline || originalSnapshot;
  const saunaBookings = getSaunaBookings(state);
  const baselineSaunaBookings = getSaunaBookings(baseline);
  const saunaRowsCount = Math.max(saunaBookings.length, baselineSaunaBookings.length);
  const saunaAddedCount = Math.max(0, saunaBookings.length - baselineSaunaBookings.length);
  const saunaDeletedCount = Math.max(0, baselineSaunaBookings.length - saunaBookings.length);
  const spaBookings = getSpaBookings(state);
  const baselineSpaBookings = getSpaBookings(baseline);
  const spaRowsCount = Math.max(spaBookings.length, baselineSpaBookings.length);
  const spaAddedCount = Math.max(0, spaBookings.length - baselineSpaBookings.length);
  const spaDeletedCount = Math.max(0, baselineSpaBookings.length - spaBookings.length);
  const deletedChanges = [
    state.petDeleted && !baseline.petDeleted && "Проживание с животным",
    state.saunaDeleted && !baseline.saunaDeleted && "Баня с пармастером",
    state.dinnerQty === 0 && baseline.dinnerQty > 0 && "Романтический ужин",
    state.concertQty === 0 && baseline.concertQty > 0 && "Концерт Las Palmas на террасе Club Nevarest",
    saunaDeletedCount > 0 &&
      `Баня с пармастером${saunaDeletedCount > 1 ? ` (${saunaDeletedCount})` : ""}`,
    spaDeletedCount > 0 &&
      `Авторская СПА программа "Турецкий шарм"${spaDeletedCount > 1 ? ` (${spaDeletedCount})` : ""}`,
  ].filter(Boolean);
  const changedChanges = [
    state.dinnerQty > 0 &&
      baseline.dinnerQty > 0 &&
      state.dinnerQty !== baseline.dinnerQty &&
      "Романтический ужин",
    state.concertQty > 0 &&
      baseline.concertQty > 0 &&
      state.concertQty !== baseline.concertQty &&
      "Концерт Las Palmas на террасе Club Nevarest",
  ].filter(Boolean);
  const addedChanges = [
    !state.petDeleted && baseline.petDeleted && "Проживание с животным",
    !state.saunaDeleted && baseline.saunaDeleted && "Баня с пармастером",
    state.dinnerQty > 0 && baseline.dinnerQty === 0 && "Романтический ужин",
    state.concertQty > 0 && baseline.concertQty === 0 && "Концерт Las Palmas на террасе Club Nevarest",
    saunaAddedCount > 0 &&
      `Баня с пармастером${saunaAddedCount > 1 ? ` (${saunaAddedCount})` : ""}`,
    spaAddedCount > 0 &&
      `Авторская СПА программа "Турецкий шарм"${spaAddedCount > 1 ? ` (${spaAddedCount})` : ""}`,
  ].filter(Boolean);
  const dinnerDisplayQty = getSimpleServiceDisplayQty(
    state.dinnerQty,
    baseline.dinnerQty,
  );
  const concertDisplayQty = getSimpleServiceDisplayQty(
    state.concertQty,
    baseline.concertQty,
  );

  return (
    <main className="page confirm-page">
      <section className="confirm-card">
        <div className="warning-callout">
          <b>Проверьте изменения — стоимость бронирования пересчитана</b>
          <p>
            Если вы подтвердите изменения, общая стоимость изменится:{" "}
            <b>{money.format(totals.baseTotal)} ₽ → {money.format(totals.total)} ₽</b>.
            Доплата — при заселении.
          </p>
        </div>
        <section className="change-summary" hidden>
          <h2>Изменения в бронировании</h2>
          <dl>
            <dt>Удаленные услуги</dt>
            <dd>{deletedChanges.join(", ") || "Нет"}</dd>
            <dt>Измененные услуги</dt>
            <dd>{changedChanges.join(", ") || "Нет"}</dd>
            <dt>Добавленные услуги</dt>
            <dd>{addedChanges.join(", ") || "Нет"}</dd>
          </dl>
        </section>
        <section className="details-table">
          <h2>Детализация бронирования</h2>
          <div className="table-box">
            <div className="table-head">Номер Люкс</div>
            <TableRow title="Размещение" meta="2 взрослых" price="39 200 ₽" />
            <div className="table-section">Услуги</div>
            <TableRow
              title="Завтрак"
              meta="2 шт."
              price="Включено в стоимость"
            />
            <TableRow
              title="Ранний заезд (pre-checked)"
              meta="1 шт."
              price="Включено в стоимость"
            />
            {state.saunaDeleted !== baseline.saunaDeleted && (
              <TableRow
                status={state.saunaDeleted ? "deleted" : "added"}
                title="Баня с пармастером"
                meta="16 ноября 2026 • 18:30 • 4 гостя • 2 часа"
                price="16 000 ₽"
              />
            )}
            {state.petDeleted !== baseline.petDeleted && (
              <TableRow
                status={state.petDeleted ? "deleted" : "added"}
                title="Проживание с животным"
                meta="1 шт."
                price="5 000 ₽"
              />
            )}
            {state.dinnerQty !== baseline.dinnerQty && (
              <TableRow
                status={
                  state.dinnerQty === 0
                    ? "deleted"
                    : baseline.dinnerQty === 0
                      ? "added"
                      : "changed"
                }
                title="Романтический ужин"
                meta={formatGuestCount(dinnerDisplayQty)}
                price={
                  state.dinnerQty > 0 && baseline.dinnerQty > 0
                    ? `${money.format(baseline.dinnerQty * 4000)} ₽  ${money.format(state.dinnerQty * 4000)} ₽`
                    : `${money.format(Math.max(state.dinnerQty, baseline.dinnerQty) * 4000)} ₽`
                }
              />
            )}
            {state.concertQty !== baseline.concertQty && (
              <TableRow
                status={
                  state.concertQty === 0
                    ? "deleted"
                    : baseline.concertQty === 0
                      ? "added"
                      : "changed"
                }
                title="Концерт Las Palmas на террасе Club Nevarest"
                meta={formatGuestCount(concertDisplayQty)}
                price={
                  state.concertQty > 0 && baseline.concertQty > 0
                    ? `${money.format(baseline.concertQty * 3000)} ₽  ${money.format(state.concertQty * 3000)} ₽`
                    : `${money.format(Math.max(state.concertQty, baseline.concertQty) * 3000)} ₽`
                }
              />
            )}
            {Array.from({ length: saunaRowsCount }).map((_, index) => {
              const booking = saunaBookings[index];
              const baselineBooking = baselineSaunaBookings[index];
              const visibleBooking = booking || baselineBooking;
              const status = booking
                ? baselineBooking && sameSaunaBooking(booking, baselineBooking)
                  ? null
                  : "added"
                : "deleted";

              if (!status) return null;

              return (
                <TableRow
                  key={`sauna-confirm-${index}`}
                  status={status}
                  title="Баня с пармастером"
                  meta={`${visibleBooking.date} • ${visibleBooking.time} • ${visibleBooking.guests} гостя • ${getSaunaHours(visibleBooking)} часа`}
                  price={`${money.format(getSaunaPrice(visibleBooking))} ₽`}
                />
              );
            })}
            {Array.from({ length: spaRowsCount }).map((_, index) => {
              const booking = spaBookings[index];
              const baselineBooking = baselineSpaBookings[index];
              const visibleBooking = booking || baselineBooking;
              const status = booking
                ? baselineBooking && sameSpaBooking(booking, baselineBooking)
                  ? null
                  : "added"
                : "deleted";

              if (!status) return null;

              return (
                <TableRow
                  key={`spa-confirm-${index}`}
                  status={status}
                  title='Авторская СПА программа "Турецкий шарм"'
                  meta={`${visibleBooking.date} • ${visibleBooking.time} • 1 гость • 2 часа`}
                  price="4 500 ₽"
                />
              );
            })}
            <div className="table-total">
              <span>Общая стоимость</span>
              <p>
                Налоги и сборы включены
                <br />
                <s>{money.format(totals.baseTotal)} ₽</s>{" "}
                <b>{money.format(totals.total)} ₽</b>
              </p>
            </div>
            <div className="table-pay">
              <b>К оплате при заселении</b>
              <strong>{money.format(totals.total)}₽</strong>
            </div>
          </div>
        </section>
        <div className="confirm-actions">
          <button className="secondary-button" onClick={() => act("go", { route: "main" })}>
            Отменить
          </button>
          <button className="primary-button" onClick={() => act("save")}>
            Сохранить изменения
          </button>
        </div>
      </section>
    </main>
  );
}

function TableRow({ title, meta, price, status }) {
  return (
    <div className={`table-row ${status || ""}`}>
      <div>
        {status === "deleted" && <span className="tag danger">Удалено</span>}
        {status === "changed" && (
          <span className="tag warning">Изменено</span>
        )}
        {status === "added" && <span className="tag success">Добавлено</span>}
        <b>{title}</b>
      </div>
      <span>{meta}</span>
      <strong className={status === "deleted" ? "strike" : ""}>{price}</strong>
    </div>
  );
}

function SuccessModal({ act, totals }) {
  return (
    <div className="overlay">
      <section className="modal success-modal">
        <div className="success-mark">
          <Check size={52} />
        </div>
        <h2>Изменения сохранены</h2>
        <p>
          Обновленное подтверждение бронирования отправлено на указанную вами
          электронную почту: ivanov@mail.com
        </p>
        <p className="modal-note">Новая стоимость: {money.format(totals.total)} ₽</p>
        <div className="modal-actions">
          <button className="secondary-button" onClick={() => act("close-success")}>
            Закрыть
          </button>
        </div>
      </section>
    </div>
  );
}

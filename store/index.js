import axios from 'axios'

export const state = () => ({

    products: [],               // Общее количество товаров, которое формируется при загрузке приложения (Не меняется в дальнейшем)
    catalog_state: [],          // Состояние каталога, которое меняется в зависимости от выбранных категорий и фильтров
    cart: [],
    categories: [],
    productsByCategories: [],
    flowers: [],
    colors: [],
    occasions: [],
    filters: {},
    favorite: [],
    search: [],
    visibleProducts: 21          // Количество видимых элементов в каталоге
})

export const mutations = {
    setProductsToState(state, products) {
        state.products = products
    },
    setCategories(state, items) {
        for (let i = 0; i < items.length; i++) {
            state.categories.push(items[i])
        }
    },
    setCatalogState(state, items) {
        state.catalog_state = items.data
    },
    setProductsByCategories(state, products) {
        state.productsByCategories.push(products)
    },
    setFlowers(state, items) {
        state.flowers = items
    },
    setColors(state, items) {
        state.colors = items
    },
    setOccasions(state, items){
        state.occasions = items
    },
    addItemsToCart(state, arr) {
        state.cart = arr
        localStorage.setItem('cart', JSON.stringify(arr))
    },
    changeCart(state, arr) {
        state.cart = arr
        localStorage.setItem('cart', JSON.stringify(arr))
    },
    removeFromCart(state, arr) {
        state.cart = arr
        localStorage.setItem('cart', JSON.stringify(arr))
    },
    changeFavorite(state, arr) {
        state.favorite = arr
        localStorage.setItem('favorite', JSON.stringify(arr))
    },
    changeSearchData(state, arr) {
        state.search = arr
    },
    addFilters(state, data){
        state.filters = data
    },
    sortCatalog(state, data){
        state.catalog_state = applyUserFiltersToCatalog(data, state.products)
    }
}

export const actions = {
    get_products({commit}) {
        return axios('//79.174.12.75:3001/catalog_products', {
            method: 'GET'
        }).then(products => {
            commit('setProductsToState', products.data)
            return products
        }).catch(e => {
            console.log('403')
            return e
        })
    },
    get_categories_data({commit}) {
        return axios('//79.174.12.75:3001/get_categories', {
            method: 'GET'
        }).then(items => {

            commit('setCategories', items.data)
    
            if (items.data.length == 0) return false
    
            for (let i = 0; i < items.data.length; i++) {
                return axios('//79.174.12.75:3001/get_all_products_by_categories', {
                    method: 'GET',
                    params: {
                        'category': items.data[i].id
                    }
                }).then(products => {
                    commit('setProductsByCategories', products.data)
                })
            }
        })
    },
    get_catalog_state({commit}, data){

        return axios('//79.174.12.75:3001/catalog_products', {
            method: 'GET'
        }).then(items => {
    
        // Категория (страница Каталога с выбранной категорией)
    
        if (data && data.category) {
            let readyItems = []
            for (let i = 0, k = 0; i < items.data.length; i++) {
                if (items.data[i].category_url != data.category) continue
                    readyItems[k] = items.data[i]
                    k++
            }
            items.data = readyItems
        }
        commit('setCatalogState', items)
    
            return items
        }).catch(e => {
            console.log(e)
            return e
        })
    },
    sort_catalog({state}, data) {
        this.commit('sortCatalog', data, state)
    },
    get_flowers_types() {
        return axios('//79.174.12.75:3001/get_flowers_types', {
            methods: 'GET'
        }).then(items => {
            this.commit('setFlowers', items.data)
        })
    },
    get_all_colors() {
        return axios('//79.174.12.75:3001/get_all_colors', {
            methods: 'GET'
        }).then(items => {
            this.commit('setColors', items.data)
        })
    },
    get_all_occasions() {
        return axios('//79.174.12.75:3001/get_occasions', {
            methods: 'GET'
        }).then(items => {
            this.commit('setOccasions', items.data)
        })
    },
    add_filters({state}, data) {
        this.commit('addFilters', data, state)
    },
    addToCart({state}, data){

        let newCart = [],
            keyExists = -1

            for (let i = 0; i < state.cart.length; i++) {
                newCart.push(state.cart[i])
            }
    
        // Проверить, есть ли уже элемент в корзине, если да то определить позицию и сохранить в переменную keyExists
    
        for (let i = 0; i < newCart.length; i++) {
            if (data.id == newCart[i].id) {
                keyExists = i
            }
        }
    
        // Если уже есть то прибавить количество просто
    
        if (keyExists >= 0) {
            newCart[keyExists].amount += data.amount
        }
    
        // Если нету, то найти в хранилище товаров, добавить свойство amount - количество и добавить в корзину
    
        else {
            // Найти в массиве товаров заказанный товар
            let item = ''
            for (let key in state.products) {
                if (state.products[key].id == data.id) {
                    item = state.products[key]
                    item.amount = data.amount
                }
            }
            newCart.push(item)
        }
        this.commit('addItemsToCart', newCart)
    },
    changeCart({state}, data){
        let cart = state.cart
    
        for (let i = 0; i < state.cart.length; i++) {
            if (cart[i].id == data.id) {
    
                if (data.value == 'minus') {
                    cart[i].amount > 1 ? cart[i].amount-- : ''
                }
                else if (data.value == 'plus') {
                    cart[i].amount < 100 ? cart[i].amount++ : ''
                }
            }
        }
        this.commit('CHANGE_CART', cart)
    },
    removeFromCart({state}, data){

        let cart = state.cart,
            newCart = cart
    
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == data.id) {
                newCart.splice(i, 1)
            }
        }
        this.commit('removeFromCart', newCart)
    },
    changeSearchData({state}, data) {
        this.commit('changeSearchData', data.items, state)
    },
    changeFavorite({state}, data) {

        let favorite = state.favorite,
            productExists = 0,
            arr = []
    
        //  Проверить, есть ли уже этот элемент в избранном
    
        for (let i = 0; i < favorite.length; i++) {
    
            if (data.product.id == favorite[i].id) {
                productExists++
                continue
            }
            else {
                arr.push(favorite[i])
            }
        }
    
        if (!productExists) arr.push(data.product)
    
        this.commit('changeFavorite', arr)
    }
}

// Функция принимает объект с выбранными фильтрами по категориям в левом меню, применяет их
// и возвращает объект для дальнейшей фильтрации по алфавиту, цене и прочим
 
function applyUserFiltersToCatalog(data, products) {

    let mySet = new Set(),
        arr = []
    // Применить фильтры по категориям

    for (let key in data.filters.tags) {
        if (data.filters.tags[key].length) {
            for (let item in products) {
                for (let i = 0; i < data.filters.tags[key].length; i++) {
                    if (products[item][key] == data.filters.tags[key][i]) mySet.add(products[item])
                }
            }
        }
    }

    // Если массив пустой то 
    if (mySet.size == 0) {
        for (let i = 0; i < products.length; i++) {
            mySet.add(products[i])
        }
    }

    // Фильтр по ценам

    for (let item of mySet) {
        if (item.price < data.filters.from || item.price > data.filters.to) {
            mySet.delete(item)
        }
    }

    // Фильтр по категории

    if (data.filters.category) {
        for (let item of mySet) {
            if (item.category_url != data.filters.category) {
                mySet.delete(item)
            }
        }
    }

    arr = Array.from(mySet)

    // Сортировка по цене - от min до max
    if (data.filters.radioFilter == 'price-min-to-max') {
        arr.sort((a, b) => {
            return a.price-b.price
        })
    }

    // Сортировка по цене - от max до min
    if (data.filters.radioFilter == 'price-max-to-min') {
        arr.sort((a, b) => {
            return b.price - a.price
        })
    }

    // Сортировка по алфавиту
    if (data.filters.radioFilter == 'price-alfabet') {
        arr.sort((a, b) => {
            return b.title - a.title
        })
    }
    return arr
}

export const getters = {
    products: s => s.products,
    catalog_state: s => s.catalog_state,
    cart: s => s.cart,
    categories: s => s.categories,
    productsByCategories: s => s.productsByCategories,
    flowers: s => s.flowers,
    colors: s => s.colors,
    occasions: s => s.occasions,
    filters: s => s.filters,
    favorite: s => s.favorite,
    search: s => s.search,
    visibleProducts: s => s.visibleProducts
}
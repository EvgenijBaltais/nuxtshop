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
        state.catalog_state = applyUserFiltersToCatalog(data, state.products.data)
    }
}

export const actions = {
    async get_products({commit}) {
        await axios('//localhost:3001/catalog_products', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=something'
            }
        }).then(products => {
            console.log('then')
            commit('setProductsToState', products)
            return products
        }).catch(e => {
            console.log('403')
            return e
        })
    },
    get_categories_data({commit}) {
        return axios('//localhost:3001/get_categories', {
            method: 'GET'
        }).then(items => {

            commit('setCategories', items.data)
    
            if (items.data.length == 0) return false
    
            for (let i = 0; i < items.data.length; i++) {
                return axios('//localhost:3001/get_all_products_by_categories', {
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

        return axios('//localhost:3001/catalog_products', {
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
        return axios('//localhost:3001/get_flowers_types', {
            methods: 'GET'
        }).then(items => {
            this.commit('setFlowers', items.data)
        })
    },
    get_all_colors() {
        return axios('//localhost:3001/get_all_colors', {
            methods: 'GET'
        }).then(items => {
            this.commit('setColors', items.data)
        })
    },
    get_all_occasions() {
        return axios('//localhost:3001/get_occasions', {
            methods: 'GET'
        }).then(items => {
            this.commit('setOccasions', items.data)
        })
    },
    add_filters({state}, data) {
        this.commit('addFilters', data, state)
    },
    addToCart({state}, data){

        let cart = state.cart,
            keyExists = -1
    
        // Ппроверить, есть ли уже элемент в корзине, если да то определить позицию и сохранить в переменную keyExists
    
        for (let i = 0; i < cart.length; i++) {
            if (data.id == cart[i].id) {
                keyExists = i
            }
        }
    
        // Если уже есть то прибавить количество просто
    
        if (keyExists >= 0) {
            cart[keyExists].amount += data.amount
        }
    
        // Если нету, то найти в хранилище товаров, добавить свойство amount - количество и добавить в корзину
    
        else {
            // Найти в массиве товаров заказанный товар
            let item = ''
            for (let key in state.products.data) {
                if (state.products.data[key].id == data.id) {
                    item = state.products.data[key]
                    item.amount = data.amount
                }
            }
            cart.push(item)
        }
        this.commit('addItemsToCart', cart)
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
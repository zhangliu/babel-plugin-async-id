const A = {
    test() {
        console.log(3)
    },

    test2() {
        this.test()
    }
}
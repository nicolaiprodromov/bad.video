class StateTracker {
    constructor(value, callbacks = [], get_callbacks = []){
        this.value = value
        this.callbacks = callbacks
        this.get_callbacks = get_callbacks
        this.prev_value = value
        this.defs = [value]
        this.limit = 10;
        this.popped = null;
        this.map = {
            "set" : this.callbacks,
            "get" : this.get_callbacks
        }
    }
    #def = 0
    get def(){
        this.#def = this.value
        for (var cb of this.get_callbacks){
            cb(this.#def, this.prev_value);
        }
        return this.#def
    }
    set def(value){
        this.value      = value
        this.prev_value = this.#def
        this.#def       = this.value
        this.defs.push(value)
        if (this.defs.length > this.limit){
            this.popped = this.defs.shift()
        }
        for (var cb of this.callbacks){
            cb(this.#def, this.prev_value);
        }
    }
    addHandler(event_type, callback){
        this.map[event_type].push(callback);
    }
}

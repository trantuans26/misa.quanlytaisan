<template>
    <div :class="cbbClass"         
        @click="this.show = !this.show"
    >
        <slot name="iconFilter"> 
            <div class="combobox__icon">
                <i class="icon icon--filter"></i>
            </div>   
        </slot>

        <slot name="input">
            <input class="input" 
                :class="inputClass"
                type="text" 
                :value="filter"  
                v-on:change.enter="this.show = !this.show" 
                readonly
                @blur="hideDrilldown()"             
            >
        </slot>
        
        <div class="combobox__icon--dropdown" :class="dropdownClass"> 
            <i class="icon icon--dropdown"></i>
        </div>


        <div class="drilldown" 
            :class="drilldownClass" 
            v-show="this.show" 
        >
            <slot name="drilldown">
                <ul class="drilldown__box" >
                    <li 
                        class="drilldown__item" 
                        tabindex="0" 
                        :class="drilldownItemClass"
                        :inlist="list"
                        v-for='item in list' 
                        @click="filterList(item)"
                        v-on:change.enter="filterList(item)"
                        :key="item"
                    >
                        <div class="drilldown__check"><i class="fa-solid fa-check"></i></div>
                        <div class="drilldown__name">{{item.name}}</div>
                    </li>
                </ul>
            </slot>
        </div>

    </div>
</template>
  
<script>

export default {
    name: "BCombobox",
    props: [
        "cbbClass",
        "inputClass",
        "drilldownClass",
        "drilldownItemClass",
        "dropdownClass",
        "filter",
        "tabindex",
    ],
    
    created() {

    },

    updated() {

    },

    watch: {

    },

    methods: {
        hideDrilldown() {
            let me = this;
            setTimeout(() => {
                    me.show = false;
            }, 200); 
        }
    },

    data() {
        return {
            show: false,
        };
    },

};

</script>
  
<style scoped>

</style>
  
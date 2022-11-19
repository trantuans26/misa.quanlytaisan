<template>
    <div class="alert__box" :class="{'alert__box--open': this.function.delete.a}">
        <div class="alert__content">
            <div class="alert__body alert__body--delete">
                <i class="icon icon--alert"></i>
                <div class="alert__title alert__title--delete">Bạn có muốn xoá tài sản <b>{{this.function.delete.fixedAssetCode}} - {{this.function.delete.fixedAssetName}}</b>?</div>
            </div>
            <div class="alert__footer">
                <button class="btn btn__outline" @click="toggleAlertDeleteARecord()">Không</button>
                <button class="btn btn__save alert__button--space" @click="toggleAlertDeleteARecord(), deleteAFixedAsset()">Xoá</button>
            </div>
        </div>
    </div>   

    <div class="alert__box" :class="{'alert__box--open': this.function.delete.multi}">
        <div class="alert__content">
            <div class="alert__body alert__body--delete">
                <i class="icon icon--alert"></i>
                <div class="alert__title alert__title--delete"><b>{{this.function.delete.quantity}}</b> tài sản đã được chọn. Bạn có muốn xoá các tài sản này khỏi danh sách?</div>
            </div>
            <div class="alert__footer">
                <button class="btn btn__save alert__button--space" @click="toggleAlertDeleteRecords()">Đóng</button>
            </div>
        </div>
    </div>  

    <div class="alert__box" :class="{'alert__box--open': this.isDisplayDeleteSuccess}">
        <div class="alert__content">
            <div class="alert__body alert__body--delete">
                <i class="icon icon--alert"></i>
                <div class="alert__title alert__title--delete"><b>{{this.function.delete.quantity}}</b> tài sản đã được chọn. Bạn có muốn xoá các tài sản này khỏi danh sách?</div>
            </div>
            <div class="alert__footer">
                <button class="btn btn__save alert__button--space" @click="toggleAlertDeleteRecords()">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Resource from "@/lib/resource";

export default {
    name: "AlertDelete",

    component: {
        axios,
        Resource
    },

    beforeCreate() {
    },

    created() {
        
    },

    methods: {
        toggleAlertDeleteARecord() {
            this.$parent.toggleAlertDeleteARecord();
        },

        toggleAlertDeleteRecords() {
            this.$parent.toggleAlertDeleteRecords();
        },

        deleteAFixedAsset() {
            try {
                axios
                .delete(`${Resource.Url.FixedAssets}/${this.$parent.selectedFixedAssetByIds[0]}`)
                .then(() => {
                    // Reload data
                    this.$parent.loadAPI();
                    this.$parent.selectedFixedAssetByIds = [];
                    // Display success toast message 
                    this.$parent.showDeleteSuccessToast();
                })
                .catch((error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        },
    },

    data() {
        return {
            function: this.$parent.function,
            isDisplayDeleteSuccess: false,
            textDeleteSuccess: '',
        }
    },
}
</script>

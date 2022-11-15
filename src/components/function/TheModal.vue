<template>
    <div class="modal" :class="{'modal--open': displayModal}">
        <form class="modal__main"  @submit.prevent="onSubmit()">
            <!-- BEGIN: Close modal -->
            <div class="modal__section modal__close" @click="closeModal()">
                <i class="icon icon--close"></i>
            </div>
            <!-- END: Close modal -->

            <!-- BEGIN: Header modal -->
            <header class="modal__section modal__header">
                Thêm tài sản
            </header>
            <!-- END: Header modal -->

            <!-- BEGIN: Body modal -->
            <div class="modal__section modal__body">
                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Mã tài sản <em>*</em>
                        </label>
                        <input ref="focusMe" v-model.trim="assetModal.fixedAssetCode" class="input input--modal" type="text" placeholder="Nhập mã tài sản" style="">
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên tài sản <em>*</em>
                        </label>
                        <input
                            v-model.trim="assetModal.fixedAssetName" 
                            v-bind:class="{'input--error': this.checkfixedAssetName.hasError}" 
                            class="input input--modal" type="text"  
                            placeholder="Nhập tên tài sản">
                        <p class="input__text--error" v-if="this.checkfixedAssetName.hasError">Tên tài sản không hợp lệ</p>
                    </div>
                </div>
                
                <!-- Bộ phận sử dụng -->
                <div class="modal__line">
                    <div 
                        class="modal__item"
                        @click="this.department.showModal = !this.department.showModal"
                    >
                        <label class="modal__label">
                            Mã bộ phận sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="assetModal.departmentCode"  
                                v-bind:class="{'input--error': this.checkDepartmentCode.hasError}" 
                                class="input input--haveicon input--modal" type="text"  
                                placeholder="Chọn mã bộ phận sử dụng"
                                @blur="hideDepartmentModal()"
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="drilldown drilldown--modal" 
                                v-show="this.department.showModal"
                            >
                                <ul class="drilldown__box" >
                                    <li class="drilldown__item drilldown__item--modal drilldown__item--header">
                                        <div class="drilldown__id"><b>Mã</b></div>
                                        <div class="drilldown__name"><b>Tên bộ phận sử dụng</b></div>
                                    </li>
                                    <li class="drilldown__item drilldown__item--modal" 
                                        :class="{'drilldown__item--selected': department.department_code == this.assetModal.departmentCode}"
                                        v-for='department in this.departments'
                                        tabindex="0"
                                        @click="selectValueDepartment(department)"
                                        :key="department"
                                        v-on:change.enter="selectValueDepartment(department), this.department.show = false"
                                    >
                                        <div class="drilldown__id">{{department.department_code}}</div>
                                        <div class="drilldown__name">{{department.department_name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkDepartmentCode.hasError">Mã bộ phận sử dụng không hợp lệ</p>
                     

                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên bộ phận sử dụng
                        </label>
                        <input v-model.trim="assetModal.departmentName" class="input input--disable input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <!-- Loại tài sản -->
                <div class="modal__line">
                    <div class="modal__item"
                       @click="this.category.showModal = !this.category.showModal"
                    >
                        <label class="modal__label">
                            Mã loại tài sản <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="this.assetModal.categoryCode"  
                                v-bind:class="{'input--error': this.checkFixedAssetCategoryCode.hasError}" 
                                class="input input--haveicon input--modal" 
                                type="text"  
                                placeholder="Chọn mã loại tài sản"
                                @blur="hideCategoryModal()"
                            >
                            <i class="icon icon--dropdown"></i>
                            <div class="drilldown drilldown--modal" 
                                v-show="this.category.showModal"
                            >
                                <ul class="drilldown__box" >
                                    <li class="drilldown__item drilldown__item--modal drilldown__item--header">
                                        <div class="drilldown__id"><b>Mã</b></div>
                                        <div class="drilldown__name"><b>Tên loại tài sản</b></div>
                                    </li>
                                    <li class="drilldown__item drilldown__item--modal" 
                                        :class="{'drilldown__item--selected': category.fixed_asset_category_code == this.assetModal.categoryCode}"
                                        v-for='category in this.categories'
                                        @click="selectValueCategory(category)"
                                        :key="category"
                                    >
                                        <div class="drilldown__id">{{category.fixed_asset_category_code}}</div>
                                        <div class="drilldown__name">{{category.fixed_asset_category_name}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="input__text--error" v-if="this.checkFixedAssetCategoryCode.hasError">Mã loại tài sản không hợp lệ</p>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label class="modal__label">
                            Tên loại tài sản 
                        </label>
                        <input v-model.trim="assetModal.categoryName" class="input input--disable input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Số lượng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="assetModal.quantity" 
                                class="input input--haveicon input--textright input__spin--hide input--modal" 
                                v-on:keypress="this.numbersOnly"
                                ref="input" 
                                type="text"

                            >
                            <i class="icon icon--multidrop"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Nguyên giá <em>*</em>
                        </label>
                        <input 
                            type="text"  
                            @keypress="this.numbersOnly"                       
                            v-model.trim="assetModal.cost"
                            @change="validateFormInput('cost')" 
                            class="input input--textright input__spin--hide input--modal" 

                        >
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Số năm sử dụng <em>*</em>
                        </label>
                        <input 
                            v-model.trim="assetModal.purchaseDate" 
                            class="input input--textright input__spin--hide input--modal" 
                            v-on:keypress="this.numbersOnly"
                            ref="input"
                            type="text"
                        >
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Tỷ lệ hao mòn (%) <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                v-model.trim="assetModal.depreciation_rate" 
                                class="input input--haveicon input--textright input__spin--hide input--modal" 
                                v-on:keypress="this.numbersOnly"
                                ref="input" 
                                type="text"
                                @change="validateFormInput('depreciation_rate')" 
                            >
                            <i class="icon icon--multidrop"></i>
                        </div>

                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Giá trị hao mòn năm <em>*</em>
                        </label>
                        <input 
                            v-model.trim="assetModal.depreciation" 
                            class="input input--textright input__spin--hide input--modal" 
                            v-on:keypress="this.numbersOnly"
                            ref="input" 
                            type="text"
                            @change="validateFormInput('depreciation')" 
                        >
                    </div>
     
                    <div class="modal__item">
                        <label class="modal__label">
                            Năm theo dõi 
                        </label>
                        <input v-model.trim="assetModal.namTheoDoi" class="input input--disable input--textright input--modal" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label class="modal__label">
                            Ngày mua <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input 
                                type="date" 
                                class="input input--modal" 
                                v-model.trim="assetModal.ngayMua"
                            >
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label class="modal__label">
                            Ngày bắt đầu sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input type="date" class="input input--modal" v-model.trim="assetModal.ngayBatDauSD">
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END: Body modal -->

            <!-- BEGIN: Footer modal -->
            <footer class="modal__section modal__footer">
                <button type="submit" class="btn btn__save btn__save--space">Lưu</button>
                <div tabindex="0" type="cancel" @click="closeModal()" class="btn btn__cancel" >Hủy</div> 
                <button v-on:focus="tabRollback()" class="btn__tabRollback"></button>
            </footer>
            <!-- END: Footer modal -->
        </form>

        <!-- BEGIN: Success toast modal -->
        <div id="toast__box" v-html="htmlToastSuccess">
        </div>
        <!-- END: Success toast modal -->

        <!-- BEGIN: Alert close modal -->
        <div class="alert__box" :class="{'alert__box--open': displayAlert}">
            <div class="alert__content">
                <div class="alert__body">
                    <i class="icon icon--alert"></i>
                    <div class="alert__title">Bạn có muốn huỷ bỏ khai báo tài sản này?</div>
                </div>
                <div class="alert__footer">
                    <button class="btn btn__outline" @click="closeAlert()">Không</button>
                    <button class="btn btn__save alert__button--space" @click="acceptAlert()">Huỷ bỏ</button>
                </div>
            </div>
        </div>
        <!-- END: Alert close modal -->

    </div>
</template>

<script>
import axios from "axios";
import Resource from "@/lib/resource";

export default {

    beforeCreate() {
        
    },

    created() {
        axios.get(`${Resource.Url.FixedAssetCategories}`)
        .then((resource) => {
            this.categories = resource.data;

        })

        axios.get(`${Resource.Url.Departments}`)
        .then((resource) => {
            this.departments = resource.data;

        })
    },

    methods: {
        /* Không đồng ý huỷ
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        closeAlert() {
            this.displayAlert = false;
        },

        /* add html thêm dữ liệu thành công
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        addHTMLToast() {
            this.htmlToastSuccess = "<div class='toast__item'><div class='toast__icon'><i class='icon icon--success'></i></div><div class='toast__text'>Lưu dữ liệu thành công</div></div>"
        },

        /* Hiển thị thông báo thêm dữ liệu thành công
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        showSuccessToast() {
            this.addHTMLToast();
            setTimeout(() => this.htmlToastSuccess = "", 5000)
        },

        /* Check dữ liệu khi lưu
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        onSubmit() {
            if(this.assetModal.fixedAssetName.trim() != "" && this.assetModal.departmentCode.trim() != "" && this.assetModal.categoryCode.trim() != "") {
                this.checkfixedAssetName.hasError = false;
                this.checkDepartmentCode.hasError = false;
                this.checkFixedAssetCategoryCode.hasError = false;
                this.showSuccessToast();
                console.log(this.assetModal);
            } else if (this.assetModal.fixedAssetName.trim() == "" && this.assetModal.departmentCode.trim() == "" && this.assetModal.categoryCode.trim() == "") {
                this.checkfixedAssetName.hasError = true;
                this.checkDepartmentCode.hasError = true;
                this.checkFixedAssetCategoryCode.hasError = true;
            } else if (this.assetModal.fixedAssetName.trim() == "" && this.assetModal.departmentCode.trim() == "") {
                this.checkDepartmentCode.hasError = true;
                this.checkfixedAssetName.hasError = true;
                this.checkFixedAssetCategoryCode.hasError = false; 
            } else if (this.assetModal.fixedAssetName.trim() == "" && this.assetModal.categoryCode.trim() == "") {
                this.checkDepartmentCode.hasError = false;
                this.checkfixedAssetName.hasError = true;
                this.checkFixedAssetCategoryCode.hasError = true;
            }
            else if (this.assetModal.departmentCode.trim() == "" && this.assetModal.categoryCode.trim() == "") {
                this.checkFixedAssetCategoryCode.hasError = true;
                this.checkDepartmentCode.hasError = true;
                this.checkfixedAssetName.hasError = false;
            } else if (this.assetModal.fixedAssetName.trim() == "") {
                this.checkfixedAssetName.hasError = true;
                this.checkDepartmentCode.hasError = false;
                this.checkFixedAssetCategoryCode.hasError = false;
            } else if (this.assetModal.departmentCode.trim() == "") {
                this.checkDepartmentCode.hasError = true;
                this.checkFixedAssetCategoryCode.hasError = false;
                this.checkfixedAssetName.hasError = false;
            } else if(this.assetModal.categoryCode.trim() == "") {
                this.checkFixedAssetCategoryCode.hasError = true;
                this.checkDepartmentCode.hasError = false;
                this.checkfixedAssetName.hasError = false;
            }

        },

        /* Dữ liệu kiểu số dấu chấm trước 3 số 0
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        formatPriceNoFixed(value) {
            return this.$parent.formatPriceNoFixed(value);
        },

        /* Dữ liệu kiểu số dấu chấm trước 3 số 0 và có 2 số thập phân
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        formatPriceFixed(value) {
            return this.$parent.formatPriceFixed(value);
        },

        /* Tab rollback về mã tài sản
            @param {}
            @returns void
            Author: Tuan 
            Date: 23/10/2022 
        */
        tabRollback() {
            setTimeout(() => {
                this.$refs.focusMe.focus();
            }, 1);
        },

        /* Input type="text" chỉ viết số
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */  
        numbersOnly(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },

        /* Chuyển sang dạng số 
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */  
        validateFormInput(value) {
            if (value == 'cost') {
                this.assetModal.cost = this.formatPriceNoFixed(this.assetModal.cost);
            } else if (value == 'depreciation') {
                this.assetModal.depreciation = this.formatPriceNoFixed(this.assetModal.depreciation);
            } else if (value == 'depreciationRate') {
                this.assetModal.depreciationRate = this.formatPriceFixed(this.assetModal.depreciationRate);
            }
        },

                /* Hàm sử lý dấu chấm thành dấu phẩy vd 6.67 thành 6,67
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
            */
            formartRate(value) {
            try {
                if (value != null) {
                    let arrayStrig = value.toString(10).split(".");
                    if (arrayStrig[1] != null) {
                        return arrayStrig[0] + "," + arrayStrig[1];
                    } else {
                        return arrayStrig[0];
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /* Hàm xử lý dấu phẩy thành dấu chấm vd 6,67 thành 6.67
            @param {}
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
            */
        formartRateToNumber(number) {
            try {
                if (number != null) {
                    let arrayStrig = number.toString(10).split(",");
                    if (arrayStrig[1] != null) {
                        return arrayStrig[0] + "." + arrayStrig[1];
                    } else {
                        return arrayStrig[0];
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /* Hàm formart số có dấu .
            @param {int} number
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        formartNumber(number) {
            try {
                if (number && !isNaN(number)) {
                    return number.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
                } else {
                    return number;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /* Hàm formart chuỗi thành kiểu float
            @param {float} numberFloat
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        handleDataToNumberTypeFloat(numberFloat) {
            try {
                if (typeof numberFloat == "number") {
                    return parseFloat(numberFloat);
                } else {
                    return parseFloat(numberFloat.replace(/[^0-9]/g, ""));
                }
            } catch (error) {
                console.log(error);
            }
        },

        /* Hàm formart chuỗi thành kiểu int
            @param {int} numberInt
            @returns void
            Author: Tuan 
            Date: 31/10/2022 
        */
        handleDataToNumberTypeInt(numberInt) {
            try {
                if (typeof number == "number") {
                    return parseFloat(numberInt);
                } else {
                    return parseFloat(numberInt.replace(/[^0-9]/g, ""));
                }
            } catch (error) {
                console.log(error);
            }
        },

        acceptAlert() {
            this.$parent.acceptAlert();
        },

        onSubmit() {
            this.$parent.onSubmit();
        },

        closeModal() {
            this.$parent.closeModal();
        },
    },

    data() {
        return {
            displayAlert: this.$parent.displayAlert,
            assetModal: this.$parent.assetModal,
            checkfixedAssetName: this.$parent.checkFixedAssetName,
            checkDepartmentCode: this.$parent.checkDepartmentCode,
            department: this.$parent.department,
            category: this.$parent.category,
            departments: [],
            categories: [],
            /* Hiển thị cảnh báo khi huỷ*/
            displayAlert: false,
            
            /* Hiển thị thông báo lưu dữ liệu thành công */
            htmlToastSuccess: "",

            /* Hiển thị lỗi cảnh báo input */
            htmlError: "",

            checkfixedAssetName: {
                hasError: false
            },
            checkDepartmentCode: {
                hasError: false
            },
            checkFixedAssetCategoryCode: {
                hasError: false
            },
        }
    },
}    
</script>

<style scoped>

</style>
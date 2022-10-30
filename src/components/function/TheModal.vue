<template>
    <div class="modal" :class="{open: displayModal}">
        <div class="modal-main">

            <div class="modal__section" @click="closeModal()">
                <i class="icon icon--close"></i>
            </div>

            <header class="modal__section modal-header">
                Sửa tài sản
            </header>

            <div class="modal__section modal-body">
                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-mataisan" class="modal__label">
                            Mã tài sản <em>*</em>
                        </label>
                        <input id="enter-mataisan" class="input" type="text"  placeholder="Nhập mã tài sản" value="TS00001">
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label for="enter-tentaisan" class="modal__label">
                            Tên tài sản <em>*</em>
                        </label>
                        <input id="enter-tentaisan" class="input" type="text"  placeholder="Nhập tên tài sản">
                    </div>
                </div>
                
                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-mabophansudung" class="modal__label">
                            Mã bộ phận sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input id="enter-mabophansudung" class="input input--haveicon" type="text"  placeholder="Chọn mã bộ phận sử dụng">
                            <i class="icon icon--dropdown"></i>
                        </div>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label for="enter-tenbophansudung" class="modal__label">
                            Tên bộ phận sử dụng
                        </label>
                        <input id="enter-tenbophansudung" class="input input--disable" type="text" tabindex="-1" >
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-maloaitaisan" class="modal__label">
                            Mã loại tài sản <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input id="enter-maloaitaisan" class="input input--haveicon" type="text"  placeholder="Chọn mã loại tài sản">
                            <i class="icon icon--dropdown"></i>
                        </div>
                    </div>
    
                    <div class="modal__item modal__item--fill">
                        <label for="enter-tenloaitaisan" class="modal__label">
                            Tên loại tài sản 
                        </label>
                        <input id="enter-tenloaitaisan" class="input input--disable" type="text" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-soluong" class="modal__label">
                            Số lượng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input id="enter-soluong" class="input input--haveicon input--textright" type="text"  value="01">
                            <i class="icon icon--multidrop"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-nguyengia" class="modal__label">
                            Nguyên giá <em>*</em>
                        </label>
                        <input id="enter-nguyengia" class="input input--textright" type="text"  value="0">
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-sonamsudung" class="modal__label">
                            Số năm sử dụng <em>*</em>
                        </label>
                        <input id="enter-sonamsudung" class="input input--textright" type="text"  value="0">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-tylehaomon" class="modal__label">
                            Tỷ lệ hao mòn (%) <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input id="enter-tylehaomon" class="input input--haveicon input--textright" type="text"  value="0">
                            <i class="icon icon--multidrop"></i>
                        </div>

                    </div>
    
                    <div class="modal__item">
                        <label for="enter-giatrihaomonnam" class="modal__label">
                            Giá trị hao mòn năm <em>*</em>
                        </label>
                        <input id="enter-giatrihaomonnam" class="input input--textright" type="text"  value="0">
                    </div>
     
                    <div class="modal__item">
                        <label for="enter-namtheodoi" class="modal__label">
                            Năm theo dõi 
                        </label>
                        <input id="enter-namtheodoi" class="input input--disable input--textright" type="text"  value="2021" tabindex="-1">
                    </div>
                </div>

                <div class="modal__line">
                    <div class="modal__item">
                        <label for="enter-ngaymua" class="modal__label">
                            Ngày mua <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input id="enter-ngaymua" class="input" type="text" value="15/8/2021">
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
    
                    <div class="modal__item">
                        <label for="enter-ngaybatdausudung" class="modal__label">
                            Ngày bắt đầu sử dụng <em>*</em>
                        </label>
                        <div class="modal__input--icon">
                            <input id="enter-ngaybatdausudung" class="input" type="text" value="15/8/2021">
                            <i class="icon icon--date"></i>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="modal__section modal-footer">
                <button class="btn btn__save btn__save--space" onclick="showSuccessToast()">Lưu</button>
                <button class="js-modal-close btn btn__cancel" onclick="hideBuyTickets()" >Hủy</button>
            </footer>
        </div>

        <div id="m-toast-box">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
        },
        methods: {
        }
    }    
</script>

<style scoped>

</style>
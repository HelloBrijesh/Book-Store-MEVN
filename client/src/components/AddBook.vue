<template>
  <div>
    <form @submit.prevent="handleAddBook">
      <div class="p-3 p-lg-5 border">
        <div class="form-group row">
          <div class="col-md-12">
            <label for="bookName" class="text-black">Book Name<span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="bookName"
              name="bookName"
              placeholder=""
              v-model="addBookPayload.bookName"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <label for="author" class="text-black">Author</label>
            <input type="text" class="form-control" id="author" name="author" v-model="addBookPayload.authorName" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-6">
            <label for="price" class="text-black">Price<span class="text-danger">*</span></label>
            <input type="number" min="1" class="form-control" id="price" name="price" v-model="addBookPayload.price" />
          </div>
          <div class="col-md-6">
            <label for="quantity" class="text-black">Quantity<span class="text-danger">*</span></label>
            <input
              type="number"
              class="form-control"
              id="quantity"
              name="quantity"
              min="1"
              v-model="addBookPayload.quantity"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <label for="bookCategory">Category</label>
            <select id="bookCategory" class="form-control" v-model="addBookPayload.category">
              <option disabled value="">Please select one</option>
              <option>Romance</option>
              <option>Health</option>
              <option>Food</option>
              <option>Travel</option>
              <option>History</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <label for="bookImage"
              >Upload Image (png/jpeg/jpg)
              <span v-if="uploaded === true" class="text-success font-weight-bold">Uploaded</span></label
            >
            <input
              type="file"
              class="form-control-file"
              id="bookImage"
              @change="handleImageUpload"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <label for="bookDescription" class="text-black">Book Description</label>
            <textarea
              name="bookDescription"
              id="bookDescription"
              cols="30"
              rows="7"
              class="form-control"
              v-model="addBookPayload.bookDescription"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-12">
            <input type="submit" class="btn btn-primary btn-lg btn-block" value="Add Book" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-12">
            <input type="reset" class="btn btn-primary btn-lg btn-block" value="Reset" />
          </div>
        </div>
      </div>
    </form>
  </div>
  <div v-if="added === true" class="text-success text-center mt-3 font-weight-bold">Book Added successfully</div>
  <div v-if="error" class="text-danger text-center mt-3 font-weight-bold">{{ error }}</div>
</template>

<script setup>
import { storage } from "../../firebase.js";
import { ref as firebaseRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { onMounted, reactive, ref } from "vue";
import useAdminService from "../services/adminService";

const { addBook, statusCode, error } = useAdminService();

let imageName = ref(null);
const addBookPayload = reactive({
  bookName: "",
  authorName: "",
  price: "",
  quantity: "",
  category: "",
  imageUrl: "",
  bookDescription: "",
});
const handleImageUpload = (e) => {
  const storageRef = firebaseRef(storage, `folder/${imageName}`);
  uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
    console.log("uploaded");
    getDownloadURL(storageRef).then((download_url) => {
      addBookPayload.imageUrl = download_url;
      uploaded.value = true;
    });
  });
};

const added = ref(false);
const uploaded = ref(false);
const handleAddBook = async (e) => {
  await addBook(addBookPayload);
  added.value = true;
  uploaded.value = false;
  setTimeout(() => {
    added.value = false;
  }, 2000);
};

onMounted(() => {
  imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
});
</script>

<style scoped></style>

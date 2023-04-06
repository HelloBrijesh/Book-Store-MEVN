<template>
  <Header></Header>
  <div class="bg-light py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-0">
          <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
          <strong class="text-black">Admin</strong>
        </div>
      </div>
    </div>
  </div>
  <div class="site-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <h2 class="h3 mb-3 text-black">Add Book</h2>
        </div>
        <div class="col-md-6">
          <form action="#" method="post">
            <div class="p-3 p-lg-5 border">
              <div class="form-group row">
                <div class="col-md-12">
                  <label for="bookName" class="text-black">Book Name<span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="bookName" name="bookName" placeholder="" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-12">
                  <label for="author" class="text-black">Author</label>
                  <input type="text" class="form-control" id="author" name="author" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="price" class="text-black">Price<span class="text-danger">*</span></label>
                  <input type="number" class="form-control" id="price" name="price" />
                </div>
                <div class="col-md-6">
                  <label for="quantity" class="text-black">Quantity<span class="text-danger">*</span></label>
                  <input type="number" class="form-control" id="quantity" name="quantity" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-12">
                  <label for="bookImage">Upload Image</label>
                  <input type="file" class="form-control-file" id="bookImage" />
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
                  ></textarea>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <input type="submit" class="btn btn-primary btn-lg btn-block" value="Add Book" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped></style>

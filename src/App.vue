<template>
  <div class="flex bg-purple-50">
    <div class="flex items-center flex-col justify-center w-96 max-w-full h-screen mx-auto text-center ">
      <img
        class="m-4 w-28"
        src="./assets/garbage_truck.svg"
        title="Garbage Truck by Karla Design from the Noun Project."
      />

      <router-view class="min-h-64 px-6 w-full"></router-view>
    </div>
  </div>
</template>

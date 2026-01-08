<script setup lang="ts">
import HeroWithFigure from '@/components/HeroWithFigure.vue'
</script>

<template>
  <main>
    <div id="hero" className="hero h-[calc(100vh_-_72px)] bg-cover">
      <div className="hero-overlay bg-black/30"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-4xl">
          <h1 className="mb-5 text-5xl sm:text-7xl text-white font-title">CLUB FOOT</h1>
          <p className="mb-5 text-white font-bold text-2xl sm:text-4xl leading-[1.5]">
            Find your favorite club on the 4 best football league in the world
          </p>
        </div>
      </div>
    </div>

    <HeroWithFigure
      header="Get the latest league information"
      paragraph="See the latest league information about standings, schedule and match result"
      imageName="league_icon"
    />
    <HeroWithFigure
      isReverse
      header="Browse various clubs"
      paragraph="Explore various clubs and get the latest club information about squad, schedule and result"
      imageName="club_icon"
    />
    <HeroWithFigure
      header="Suscribe your favorite club"
      paragraph="Suscribe your club to get notification about your club match schedule and match result"
      imageName="picture_save"
      :imageBgOpacity="0"
    />
  </main>
</template>

<style>
@media screen and (orientation: portrait) {
  #hero {
    background-image: url('@/assets/images/Football-Field-portrait.svg');
  }
}

@media screen and (orientation: landscape) {
  #hero {
    background-image: url('@/assets/images/Football-Field.svg');
  }
}
</style>

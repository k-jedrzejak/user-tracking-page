<template>
  <p>
    Paragraph {{ index }}: Lorem ipsum dolor sit amet, consectetur adipiscing
    elit. Nullam vehicula urna ac purus tristique, eu cursus ex lacinia.
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
    cubilia curae; Suspendisse potenti. Sed sit amet volutpat eros. Aliquam erat
    volutpat. Integer nec turpis nec lacus efficitur bibendum in nec arcu.
    Phasellus ut sapien ut est feugiat viverra. Integer vehicula sapien ut lacus
    ultrices feugiat. Donec feugiat consequat tortor, a volutpat est ultricies
    ut. Nullam ullamcorper nulla ac mi ultrices, nec facilisis odio efficitur.
    Sed eu eros a justo facilisis malesuada. Cras non suscipit sapien. Fusce
    eget nunc a magna aliquam laoreet. Curabitur gravida nec leo et fermentum.
    Phasellus vestibulum tincidunt nulla ac tincidunt.
  </p>
</template>

<script>
export default {
  name: "WebParagraph",
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

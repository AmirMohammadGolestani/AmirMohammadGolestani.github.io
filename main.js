var sections = $('div.container').find('div.section').map(function() {
      return {
        id: '#' + $(this).attr('id'),
        offset: $(this).offset().top,
        height: $(this).outerHeight()
      }
    }),
    currentSectionIndex = 0, 
    lastScrollPosition = 0,
    lastActivatedAnchor = sections[currentSectionIndex].id

$(window).scroll(function() {
  var scrollPosition = $(this).scrollTop();
  var currentSection = sections[currentSectionIndex]
  if (lastScrollPosition < scrollPosition) {
    if ((currentSection.offset + currentSection.height - 160) < scrollPosition
      && currentSectionIndex !== sections.length - 1
    ) {
      while((currentSection.offset + currentSection.height - 160) < scrollPosition) {
        if (currentSectionIndex !== sections.length - 1) {
          currentSectionIndex = currentSectionIndex + 1
          currentSection = sections[currentSectionIndex]
        } else break
      }
      $('a.section-anchor[href="' + lastActivatedAnchor + '"]').removeClass('active-anchor')
      $('a.section-anchor[href="' + currentSection.id + '"]').addClass('active-anchor')
      lastActivatedAnchor = currentSection.id
    }
  } else {
    if (scrollPosition < (currentSection.offset - 160) && currentSectionIndex !== 0) {
      while(scrollPosition < (currentSection.offset - 160)) {
        if (currentSectionIndex !== 0) {
          currentSectionIndex = currentSectionIndex - 1
          currentSection = sections[currentSectionIndex]
        } else break
      }
      $('a.section-anchor[href="' + lastActivatedAnchor + '"]').removeClass('active-anchor')
      $('a.section-anchor[href="' + currentSection.id + '"]').addClass('active-anchor')
      lastActivatedAnchor = currentSection.id
    }
  }
  lastScrollPosition = scrollPosition
})
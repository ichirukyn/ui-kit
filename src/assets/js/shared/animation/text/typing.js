document.addEventListener('DOMContentLoaded', () => {
  const resolver = {
    resolve: function resolve(options, callback) {
      // The string to resolve
      const resolveString = options.resolveString;
      const combinedOptions = Object.assign({}, options, { resolveString: resolveString });


      function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function randomCharacter(characters) {
        return characters[getRandomInteger(0, characters.length - 1)];
      }

      function doRandomiserEffect(options, callback) {
        setTimeout(() => {
          if (options.iterations >= 0) {
            const nextOptions = Object.assign({}, options, { iterations: options.iterations - 1 });

            if (!options.isRandom) {
              options.element.textContent = options.partialString;
              return doRandomiserEffect(nextOptions, callback);
            }

            // Ensures partialString without the random character as the final state.
            if (options.iterations === 0) {
              options.element.textContent = options.partialString;
            } else {
              options.element.textContent = options.partialString.substring(0, options.partialString.length - 1) + randomCharacter(options.characters);
            }

            doRandomiserEffect(nextOptions, callback);
          } else if (typeof callback === 'function') {
            callback();
          }
        }, options.timeout);
      }

      function doResolverEffect(options, callback) {
        const resolveString = options.resolveString;
        const offset = options.offset;

        const partialString = resolveString.substring(0, offset);
        const combinedOptions = Object.assign({}, options, { partialString: partialString });

        doRandomiserEffect(combinedOptions, () => {
          const nextOptions = Object.assign({}, options, { offset: offset + 1 });

          if (offset <= resolveString.length) {
            doResolverEffect(nextOptions, callback);
          } else if (typeof callback === 'function') {
            callback();
          }
        });
      }

      doResolverEffect(combinedOptions, callback);
    },
  };

  const elements = document.querySelectorAll('.text_typing');

  elements?.forEach((element) => {
    const text = element?.nextElementSibling;
    let strings = [text?.textContent || ''];

    if (text?.children?.length) {
      strings = [];
      Array.from(text?.children)?.forEach((el) => strings.push(el?.textContent || ''));
    }

    let counter = 0;

    const options = {
      // Initial position
      offset: 1,
      // Timeout between each random character
      timeout: 5,
      // Number of random characters to show
      iterations: 10,
      // Random characters to pick from
      characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
      // String to resolve
      resolveString: strings[counter],
      // The element
      element: element,
      // Random typing or not
      isRandom: element.classList.contains('text_typing-random'),
    };


    // Callback function when resolve completes
    function callback() {
      setTimeout(() => {
        counter++;

        if (counter >= strings.length) return;

        let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
        resolver.resolve(nextOptions, callback);
      }, 1000);
    }

    resolver.resolve(options, callback);
  });
});
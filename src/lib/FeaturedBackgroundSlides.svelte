<script>
    import { onMount } from 'svelte';
	import { bounceOut, cubicOut, sineOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
    import { fly } from 'svelte/transition';

    let { movies } = $props();

    let featuredContainer = $state();
    let featuredContainerHeight = $state(0);
    let featuredContainerWidth = $state(0);
    let tweens = $state([]);
    let speeds = $state([]);
    let movieArrays = $state([]);
    let cardWidth = $state(0);
    let id = 0;

    onMount(() => {
        if(!featuredContainer) return;

        const tempMovieArrays = Array.from({ length: Math.ceil(featuredContainerHeight / 200) }, () => 
            Array.from({ length: Math.ceil(featuredContainerWidth / 100) }, () => {
            const movie = movies[Math.floor(Math.random() * movies.length)];
            return { ...movie, elementId: id++ };
            })
        );

        for(const row of tempMovieArrays) {
            speeds.push({
                speed: Math.random() < 0.5 ? -1 : 1,
                duration: Math.random() * (30000 - 25000) + 25000
            });
            tweens.push(new Tween(0, {
                duration: speeds[speeds.length - 1].duration,
            }))

            tweens[tweens.length - 1].set(speeds[tweens.length - 1].speed * 1000, { delay: 2000})
        }

        movieArrays = tempMovieArrays;
    })

    $effect(() => {
        for(let i = 0; i < tweens.length; i++) {
            if(tweens[i].current > cardWidth + 20) {
                movieArrays[i].unshift(movieArrays[i].pop());
                tweens[i].set(0, {
                    duration: 0
                });
                tweens[i].set(speeds[i].speed * 1000);
            } else if (tweens[i].current < -cardWidth - 20) {
                movieArrays[i].push(movieArrays[i].shift());
                tweens[i].set(0, {
                    duration: 0
                });
                tweens[i].set(speeds[i].speed * 1000);
            }
        }
    })

    $effect(() => {
        if(Math.ceil(featuredContainerHeight / 200) > movieArrays.length) {
            movieArrays.push(
                Array.from({ length: Math.ceil(featuredContainerWidth / 100) }, () => {
                    const movie = movies[Math.floor(Math.random() * movies.length)];
                    return { ...movie, elementId: id++ };
                })
            );
            for(let i = 0; i < movieArrays.length - speeds.length; i++) {
                speeds.push({
                    speed: Math.random() < 0.5 ? -1 : 1,
                    duration: Math.random() * (30000 - 25000) + 25000
                });
                tweens.push(new Tween(0, {
                    duration: speeds[speeds.length - 1].duration,
                }))
                tweens[tweens.length - 1].set(speeds[speeds.length - 1].speed * 1000);
            }
        }
        for(const row of movieArrays) {
            if(Math.ceil(featuredContainerWidth / 100) > row.length) {
                row.push(
                    ...Array.from({ length: Math.ceil(featuredContainerWidth / 100) - row.length }, () => {
                        const movie = movies[Math.floor(Math.random() * movies.length)];
                        return { ...movie, elementId: id++ };
                    })
                );
            }
        }
    })

    function cubic(t, i) {
        const rise = (1000 / (speeds[i].duration / 2000)) / featuredContainerWidth;
        const intersectionX = 1 - Math.sqrt(rise / 3);

        if( t < intersectionX ) {
            return Math.pow(t - 1, 3) + rise * t + 1;
        } else {
            const intersectionY = Math.pow(intersectionX - 1, 3) + rise * t + 1;
            return rise * (t - intersectionX) + intersectionY;
        }
    }
</script>

<div bind:this={featuredContainer} bind:clientHeight={featuredContainerHeight} bind:clientWidth={featuredContainerWidth} class="fixed top-0 left-0 w-full h-full rotate-6 -mt-32 grid gap-5 brightness-50 -z-50">
    {#each movieArrays as movies, i}
        <div transition:fly={{ x: featuredContainerWidth * -speeds[i].speed, easing: (t) => cubic(t, i), duration: 2000}} style="transform: translateX({tweens[i].current || 0}px)" class="flex justify-center gap-5">
            {#each movies as movie (movie.elementId)}
                <img bind:clientWidth={cardWidth} src="/api/v1/images/covers/{movie.cover}" alt={movie.title} class="h-60" />
            {/each}
        </div>
    {/each}
</div>
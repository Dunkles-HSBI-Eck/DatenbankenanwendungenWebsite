<script>
    let { titel, thumbnail, href} = $props();
</script>

<a href = {href}>
<div class="duration-100 preset-filled-primary-500 w-100 h-100 m-10 hover:scale-120">
    <header>
        <div class="flex max-w overflow-hidden w-100 h-60">
            <img src="{thumbnail}" alt="thumbnail" class="h-full w-full object-center object-contain" >
        </div>
        
        
    </header>
    
    <h1 class="text-2xl base-font-color-dark base-font-style base-font-family">{titel}</h1>
    
    
</div>
</a>
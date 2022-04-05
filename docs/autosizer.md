# Вводный брифинг по компонентам шаблонизатора react-declarative

## Компонент `Autosizer`

>  Компонент представляет собой контейнер, который автоматически подстраивается под размеры родительского компонента. Не дает содержимому вылезти за края контейнера.
Придает рдительскому компоненту `position: relative`, `overlow: hidden`. А для ребенка устанавливает значение `position: absolute`. И растягивает его на всю ширину и высоту. 

Например: 

```tsx
<div style={{width: "30em", height: "30em"}}>
    <AutoSizer>
      {({ width, height }) => (
        <img style={{height: height, width: width}} src="https://cdnn21.img.ria.ru/images/156087/28/1560872802_0:680:1536:1832_1920x0_80_0_0_13851eec92ec40195a70b46caeba8116.jpg" alt="cat" />          
      )}
    </AutoSizer>
</div>
```

Принимает в себя `height` и `width`, которые можно передать как пропсы дальше. ДОЛЖЕН иметь родительский компонент, в котором будут заданы размеры. Удобен при необходимости вставить изображене, видео, svg, `canvas`, и тп.

Изначально подстраивает под размеры без учета `border`. Для того, чтобы содержимое отображалось внутри с учетом `border`, необходимо прописать:

```tsx
const borderWidth = 2
<AutoSizer heightRequest={(h) => h - 2 * borderWidth} widthRequest={(w) => w - 2 * borderWidth}>
    ...
</AutoSizer>
```
, где borderWidth - ширина `border`.

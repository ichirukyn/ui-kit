# Важно!!!

___
Документация сейчас в разработке. В ней практически ничего нет...

# Название классов.

___

В основном название классов исходит из укороченных версий autocomplete. Но иногда бывает удобнее их ещё сократить или
немного изменить, для лучшей читабельности.
Например `bd` на `b`, `bdrs` на `brs`. Одна буква, но большая разница в удобстве.

```
.p_0 // padding: 0;

.pb_0 // padding-bottom: 0;

.m_0 // margin: 0;

.b_0 // border: 0;
```

Все addModules, будут иметь `!important`, и располагаться так, чтобы перезаписывать общие стили

```
.bar {
  padding: 40px;
}

class="bar p_0 pb_20" // padding: 0; padding-bottom: 20px;
```

В итоге у нас получиться:

```
div.bar.p_0.pb_0 {
  padding-top: 0 !important;
  padding-bottom: 20px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
```

Перезаписывать Add можно с помощью, уточнений классов и добавления `!important`

```
.foo > .bar {
  padding: 40px !important;
}
```

или

```
@media (...) {
  .bar {
    padding: 40px !important;
  }
}
```

---

# Модификаторы классов

___

Модификаторы классов могут быть следующими

Модификатор направления:

```
.ov_Y // overflow-y: hidden;

.gap_10X // column-gap: 10px;
```

+ X - горизонтальное.
+ Y - Вертикальное.

Модификаторы единиц измерения:

```
.w_100p // width: 100%;

.vh_100 // height: 100vh;

.opacity_40p // opacity: 0.4;

.text_vBold // font-weight: 700
```

- p -- от Англ. percent
- vh -- view-height
- vBold, eBold -- very bold, extra bold.

---

# Обновление

___

- Количество primary сокращено до 5
- Теперь у каждого `bg` есть `-h`
- Расширена поддержка `border`.`
  + Добавлены `b_[n]`, `bt`, `bb`, `br`, `bl`, `bc`, `bw`, `bst`, `brs`
  + `br` переименован в `brs`, чтобы не перепутать с `border-right`
  + Теперь у каждого `bc` есть `-h`
- Тест новых единиц измерения `vw` и `vh`.
- Добавлены `gap_[n]X` и `gap_[n]Y`
- Увеличено количество готовых классов, как для кратных 2 (4px, 8, 12, 16...), так и для 5 (5px, 10, 15, 20...)
- Серьезное изменение `overflow`, в сторону удобства
- Разделение `add.scss` на модули `/Add/`

---

# Устаревшие свойства

___

`full-width` - Заменен на `w_100p`

`full-width-v` - Заменен на `vw_100`

`full-height` - Заменен на `h_100p`

`border_none` - Заменен на `b_none`

`bg_primary_900` -- `bg_primary_600` - Поддержка прекращена


---

# Api

___

## Overflow

___
`hidden` используется наиболее часто, поэтому используется по умолчанию и его указывать не требуется

```
.ov // overflow: hidden;
.ov_Y // overflow-y: hidden;
.ov_scrollY // overflow-y: scroll;
```

## Position

___

Position исключение из правил названия классов, потому что:

1. Его нужно видеть из далека. Т.е. Легко читаемый.
2. Название класса ни с чем не пересекается, и не создает путаницу
3. Удобство

```
.relative // position: relative;
.left // left: 0;
.left-60 // left: -60px;
```

## Цвета

___

Цвета `$gray_0` и `$gray_700` всегда статичны, кроме случаев, когда совершенно не нужны.

Цвета располагаются по системе:
> Чем светлее тем выше число. `$gray_0 = #000`, `$gray_700 = #fff`. Между ними находятся оттенки. С остальными
> цветами (`primary`, `secondary`, etc...) такая же схема.

```
.bg_gray_700 // background: $gray_700;
.text_gray_700 // color: $gray_700;
.bc_primary_700-h //[:hover] border-color: $primary_700
```

У цветов могут быть модификаторы `-h`, это значит, что при наведении на блок с этим классом сработает `:hover` эффект.
Часть этих эффектов настраивается в конфиге, другая непосредственно классами.



---

# Сноска

___

\[n] - Обозначает любое число

\[:hover] - Применён :hover к классу.
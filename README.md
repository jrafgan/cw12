Контрольная работа 12
Нужно сделать приложение - сайт для фотогалереи. Общий вид:

При клике на изображение должен открываться popup (всплывающее окно), показывающий полное изображение на весь экран с кнопкой "закрыть".

Внешний вид попапа можете реализовать как хотите, также как и кнопку "закрыть".

При клике на имя автора, вы попадаете на страницу просмотра всех фотографий, загруженных данным автором:

Если вы залогинились, и вы являетесь этим автором, то на данной странице вы видите кнопку "Загрузить новое фото" и возможность удалить любые свои фотографии:

Если вы залогинены, но не являетесь этим автором, вы можете только просматривать, аналогично главной странице (попап с просмотром изображения в большем масштабе)

Также на эту страницу можно перейти, нажав на "John Doe" в верхнем тулбаре (в примере выше), либо при переходе из меню пользователя (смотря как вы решите реализовать верхний тулбар)

Форма добавления нового фото:

Оба поля являются обязательными, необходимо добавить валидацию, которая будет показывать пользователям, что какое-то из полей не введено или файл не выбран. Можно сделать клиентскую валидацию, но сервер тоже должен это проверять, и не позволять отправлять какое-то из этих полей пустым.

Указания
Сдавать проект в виде ссылки на публичный репозиторий (Bitbucket или Github - на выбор), или двух репозиториев - для клиентского и серверного приложения по-отдельности.

Коммитов в проектах должно быть много, чем больше, тем лучше. Если будет только один или несколько больших коммитов - балл будет снижен.

Использование issue tracker, встроенного в сервисы Bitbucket или Github будет считаться плюсом (на усмотрение проверяющего).

В проектах должны быть правильные файлы .gitignore и под версионным контролем должны отсутствовать лишние файлы (файлы IDE, лишние загруженные изображения), и наоборот - все директории для загружаемых изображений и т.п. - должны присутствовать, чтобы проверяющему не пришлось самому создавать эти директории для проверки.

В проекте должен присутствовать файл фикстур, который создает несколько фикстурных пользователей и добавляет для них несколько изображений. Фикстурные изображения тоже должны присутствовать в репозитории.

Регистрация/логин стандартным способом (через логин/пароль). Аутентификация через фейсбук также должна быть.
# WEB103 Project 4 - Bolt Bucket

Submitted by: **Tanishq**

About this web app: **Bolt Bucket is a car customization web app where users can select and create their custom cars by choosing various features such as color, engine type, interior, and transmission. The app dynamically updates the price based on the selected options and ensures that users cannot select incompatible features.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomCar` table**
  - [x] **NOTE: Your GIF must include a view of your Railway database that shows the contents of the table used by your app**
- [x] **The web app uses React to display data from the API**
- [x] **Users can view a list of options they can select for different aspects of a `CustomCar`**
- [x] **On selecting each option, the displayed visual icon for the `CustomCar` updates to match the option the user chose**
- [x] **The user can submit their choices to save the car to the list of created `CustomCar`**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database**
- [x] **The app displays the total price of all features**
- [x] **Users can view a list of all submitted `CustomCar`**
- [x] **Users can edit or delete a submitted `CustomCar` from the list view of submitted `CustomCar`**
- [x] **Users can update or delete `CustomCar` that have been created from the detail page**

The following **optional** features are implemented:

- [x] **Selecting particular options prevents incompatible options from being selected even before form submission**

Note: The dropdown menu isnt visible in the gif but you can see all the options.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='client\src\assets\BOLTBUCKET-GoogleChrome2024-10-1822-43-31-ezgif.com-video-to-gif-converter.gif' width='' alt='Video Walkthrough' />

GIF created with ...  EZGifs

## Notes

Some challenges encountered:
- Implementing dynamic dropdowns that disable incompatible options was tricky, as it involved maintaining the state of all options and providing user feedback for disallowed combinations.

## License

Copyright [2024] [Tanishq]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

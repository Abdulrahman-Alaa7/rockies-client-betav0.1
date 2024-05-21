"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { RiHeartAdd2Line } from "react-icons/ri";
import { PiMinusCircleLight } from "react-icons/pi";
import { BiCarousel } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";
import { TbShoppingCartHeart } from "react-icons/tb";
import { BadgeCheck, Plus } from "lucide-react";
import { Minus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";

const Menu = ({ menu }: any) => {
  const [order, setOrder] = useState<Array<any>>([]);
  const [carousel, setCarousel] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const [itemQuantities, setItemQuantities] = useState<{
    [key: string]: number;
  }>(() => {
    const initialQuantities: { [key: string]: number } = {};
    Object.keys(menu).forEach((category) => {
      menu[category].forEach((item: any) => {
        initialQuantities[item.id] = 0;
      });
    });
    return initialQuantities;
  });

  const [orderInfo, setOrderInfo] = useState({
    tableNum: "",
    note: "",
  });

  const handleIncrease = (id: any) => {
    setItemQuantities((prevState: any) => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1,
    }));

    setOrder((prevOrder: any) =>
      prevOrder.map((item: any) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: any) => {
    if (itemQuantities[id] && itemQuantities[id] > 0) {
      setItemQuantities((prevState: any) => ({
        ...prevState,
        [id]: prevState[id] - 1,
      }));

      setOrder((prevOrder: any) =>
        prevOrder.map((item: any) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const AddToList = (item: any, nestedItem?: any) => {
    if (nestedItem) {
      const id = nestedItem.id;

      setItemQuantities((prevState) => ({
        ...prevState,
        [id]: 1,
      }));
    } else {
      const id = item.id;

      setItemQuantities((prevState) => ({
        ...prevState,
        [id]: 1,
      }));
    }

    if (nestedItem) {
      setOrder((prevOrder: any) => [
        ...prevOrder,
        {
          id: nestedItem.id,
          title: `${item.title} ${
            nestedItem ? `- "${nestedItem.subTitle}"` : ``
          }`,
          price: item.price,
          quantity: 1,
        },
      ]);
    } else {
      setOrder((prevOrder: any) => [
        ...prevOrder,
        {
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  const deleteFromList = (id: any) => {
    setOrder((prevOrder: any) =>
      prevOrder.filter((item: any) => item.id !== id)
    );

    setItemQuantities((prevState: any) => ({
      ...prevState,
      [id]: 0,
    }));
  };

  const sumPrice = (order: any[]) => {
    let TotalPrice = 0;
    for (let i = 0; i < order.length; i++) {
      TotalPrice += order[i].price * order[i].quantity;
    }
    return TotalPrice;
  };

  const validateTableNum = (tableNum: any) => {
    const numRegex = /^\d{1,4}$/;
    return numRegex.test(tableNum);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isTableNumValid = validateTableNum(orderInfo.tableNum);
    setIsValid(isTableNumValid);

    if (
      isTableNumValid &&
      orderInfo.tableNum.length >= 1 &&
      orderInfo.note.length <= 200
    ) {
      const formattedOrderList = order.map((item: any) => ({
        quantity: item.quantity,
        title: item.title,
        price: item.price,
      }));
      const data = {
        table: orderInfo.tableNum,

        note: orderInfo.note,

        order: formattedOrderList,
      };

      toast.success("Order sended successfully");
      setIsSend(true);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className="mx-3 py-8 sm:container  mb-6 border-b border-b-[#9e9e9e29]"
      id="menu"
    >
      <h2
        className={`font-semibold tracking-tight text-[25px] sm:text-[30px] text-primary  text-center py-1 mt-1 mb-10 border  border-[#ccc] dark:border-[#9e9e9e29] rounded-full sm:w-[40%] w-[100%] mx-auto transition-all`}
      >
        Rockies&#39;s Menu
      </h2>

      {order.length !== 0 && (
        <form action="" onSubmit={handleSubmit}>
          <Drawer>
            <DrawerTrigger className="fadeIn fixed right-5 bottom-6 w-fit z-30  bg-gradient-to-r from-rose-600 via-red-700 to-rose-700 border border-[#9e9e9e29] shadow-md  p-3 rounded-3xl flex justify-center items-center mx-auto text-white transition-all hover:opacity-90 ">
              <TbShoppingCartHeart size={25} />
              <span
                className={`fadeIn transition-all text-[14px] absolute -top-1 -left-2 bg-slate-900 dark:bg-slate-100 rounded-full w-fit px-2 py-0 dark:text-slate-950 text-white/90`}
              >
                {order.length}
              </span>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className={`!max-h-[530px] overflow-auto`}>
                <DrawerTitle
                  className={`flex justify-center items-center mx-auto`}
                >
                  Verify your order
                </DrawerTitle>
                <div className="my-3 mx-auto md:w-[50%] w-[95%]">
                  <Label
                    htmlFor="name"
                    className="!text-left mx-auto flex justify-start items-start "
                  >
                    Table&#39; number
                    <span className="text-primary mx-2"> (required)</span>
                  </Label>
                  <Input
                    type="number"
                    id="name"
                    className="col-span-3 mt-2"
                    placeholder="Table's number  "
                    required
                    pattern="\d{1,4}"
                    title="Please enter a number with a maximum of 4 digits."
                    maxLength={4}
                    value={orderInfo.tableNum}
                    onChange={(e: any) =>
                      setOrderInfo({
                        ...orderInfo,
                        tableNum: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="my-3 mx-auto md:w-[50%] w-[95%]">
                  <Label
                    htmlFor="note"
                    className={`!text-left mx-auto flex justify-start items-start ${
                      orderInfo.note.length >= 200 && "text-red-600"
                    }`}
                  >
                    Note{" "}
                    <span
                      className={` text-muted-foreground mx-2 ${
                        orderInfo.note.length >= 200 && "text-red-600"
                      }`}
                    >
                      {" "}
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="note"
                    className={`col-span-3 mt-2 resize-none `}
                    placeholder="notes about your order"
                    value={orderInfo.note}
                    onChange={(e: any) =>
                      setOrderInfo({
                        ...orderInfo,
                        note: e.target.value,
                      })
                    }
                  />
                  <p
                    className={` text-muted-foreground text-sm mt-3 text-right ${
                      orderInfo.note.length >= 200 && "text-red-600"
                    }`}
                  >
                    {orderInfo.note.length} / 200
                  </p>
                </div>

                <Table className={`md:w-[50%] mx-auto `}>
                  <TableCaption>A list of your order.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Quantity</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.map((item: any, index: number) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-bold flex justify-center items-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className={`font-semibold text-start`}>
                            {item.title}
                          </TableCell>
                          <TableCell className="text-right font-meduim">
                            EGP {item.price * item.quantity}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={2} className="text-left">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        EGP {sumPrice(order)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DrawerHeader>
              <DrawerFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className={`md:w-[30%] mx-auto w-full mb-6 bg-primary !text-white hover:opacity-90 hover:bg-primary`}
                    >
                      Continue to order
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md !rounded-3xl w-[95%]">
                    <DialogHeader
                      className={`flex justify-center items-center flex-col gap-2 my-3`}
                    >
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className={``}>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full"
                        disabled={isSend}
                      >
                        {isSend ? "Order Sended" : "Send order"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </form>
      )}

      {Object.keys(menu).map((category) => (
        <div className="mb-12" key={category}>
          <h3 className="text-2xl md:text-3xl font-semibold my-4 uppercase">
            {category.replace(/_/g, " ")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all">
            {menu[category].map((item: any) => (
              <div
                key={item.id}
                className={`relative bg-gradient-to-b from-red-800 to-red-900 shadow p-4 rounded-3xl transition-all md:hover:scale-105 md:hover:from-red-700 md:hover:to-red-800`}
              >
                {item.imgSrc && (
                  <div
                    className={`flex items-center justify-center p-4 w-fit mx-auto rounded-full`}
                  >
                    <Image
                      src={item.imgSrc}
                      alt={`Burger`}
                      width={200}
                      height={200}
                      className={`rounded-full`}
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white py-2 px-1 uppercase">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-300 mb-3 px-1">{item.description}</p>
                )}
                {item.offer && (
                  <div
                    className={`absolute top-3 left-3 flex justify-center items-center`}
                  >
                    <Badge
                      className={`bg-slate-900 dark:text-white/90 font-semibold flex gap-1 items-center text-[14px]`}
                    >
                      <BadgeCheck color="white" size={19} />
                      Offer
                    </Badge>
                  </div>
                )}
                <p className="text-[#ffffffcc] p-1 font-bold">
                  EGP {item.price}
                </p>

                {item.typesRec ? (
                  <div
                    className={`flex justify-center items-center ${
                      itemQuantities[item.id] === 0 ? "mt-6" : "mt-12"
                    } mb-9 flex-col`}
                  >
                    <Button
                      type="button"
                      className={`absolute bottom-4 flex items-center gap-1 px-12 transition-all md:hover:scale-110`}
                      onClick={() => setCarousel(!carousel)}
                    >
                      {carousel ? (
                        <div
                          className={`fadeIn transition-all  flex items-center justify-center gap-1`}
                        >
                          <GoEyeClosed size={22} />
                          Hide
                        </div>
                      ) : (
                        <div
                          className={`fadeIn transition-all flex items-center justify-center gap-1`}
                        >
                          <BiCarousel size={25} />
                          Choose
                        </div>
                      )}
                    </Button>
                    {carousel && item.typesRec && (
                      <div
                        className={`fadeIn  flex justify-center item-center gap-2 my-3 !transition-all`}
                      >
                        <Carousel>
                          <CarouselContent className="w-[250px]">
                            {item.typesRec.map((el: any, elIndex: number) => (
                              <CarouselItem key={elIndex}>
                                <div
                                  className={` fadeIn transition-all bg-background p-[7px] min-h-[150px]  flex justify-center items-center flex-col rounded-lg font-semibold text-[15px]`}
                                >
                                  {el.subTitle}
                                  <div
                                    className={` transition-all flex justify-center items-center ${
                                      itemQuantities[el.id] === 0 ||
                                      itemQuantities[el.id] == undefined
                                        ? "mt-6"
                                        : "mt-16"
                                    } mb-9 flex-col`}
                                  >
                                    {itemQuantities[el.id] >= 1 ? (
                                      <Button
                                        type="button"
                                        className={` absolute bottom-1 flex items-center gap-1 px-9 transition-all md:hover:scale-110`}
                                        onClick={() => deleteFromList(el.id)}
                                      >
                                        <PiMinusCircleLight size={25} />
                                        Delete from list
                                      </Button>
                                    ) : (
                                      <Button
                                        type="button"
                                        className={` absolute bottom-3 flex items-center gap-1 px-12 transition-all md:hover:scale-110`}
                                        onClick={() => AddToList(item, el)}
                                      >
                                        <RiHeartAdd2Line size={25} />
                                        Add to List
                                      </Button>
                                    )}
                                    <div
                                      className={`${
                                        itemQuantities[el.id] === 0 ||
                                        itemQuantities[el.id] == undefined
                                          ? "!hidden"
                                          : "fadeIn flex justify-center item-center gap-2 absolute bottom-14 my-3"
                                      } !transition-all`}
                                    >
                                      <Button
                                        type="button"
                                        className={`p-2 transition-all fadeIn`}
                                        onClick={() => handleDecrease(el.id)}
                                        disabled={
                                          (itemQuantities[el.id] || 0) === 1
                                        }
                                      >
                                        <Minus size={20} />
                                      </Button>
                                      <p
                                        className={`fadeIn transition-all shadow-md bg-gradient-to-r from-rose-600 via-red-700 to-rose-700 px-4 py-2 rounded-lg font-bold text-white/90`}
                                      >
                                        {itemQuantities[el.id] || 0}
                                      </p>
                                      <Button
                                        type="button"
                                        className={`p-2 transition-all fadeIn`}
                                        onClick={() => handleIncrease(el.id)}
                                      >
                                        <Plus size={20} />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={` transition-all  flex justify-center items-center ${
                      itemQuantities[item.id] === 0 ? "mt-6" : "mt-12"
                    } mb-9 flex-col`}
                  >
                    {itemQuantities[item.id] >= 1 ? (
                      <Button
                        type="button"
                        className={` absolute bottom-4 flex items-center gap-1 px-12 transition-all md:hover:scale-110`}
                        onClick={() => deleteFromList(item.id)}
                      >
                        <PiMinusCircleLight size={25} />
                        Delete from list
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className={`  absolute bottom-4 flex items-center gap-1 px-12 transition-all md:hover:scale-110`}
                        onClick={() => AddToList(item)}
                      >
                        <RiHeartAdd2Line size={25} />
                        Add to List
                      </Button>
                    )}
                    <div
                      className={`${
                        itemQuantities[item.id] === 0
                          ? "!hidden"
                          : " flex justify-center item-center gap-2 absolute bottom-14 my-3"
                      } !transition-all fadeIn `}
                    >
                      <Button
                        type="button"
                        className={`p-2 transition-all fadeIn`}
                        onClick={() => handleDecrease(item.id)}
                        disabled={(itemQuantities[item.id] || 0) === 1}
                      >
                        <Minus size={20} />
                      </Button>
                      <p
                        className={`fadeIn transition-all shadow-md bg-gradient-to-r from-rose-600 via-red-700 to-rose-700 px-4 py-2 rounded-lg font-bold text-white/90`}
                      >
                        {itemQuantities[item.id] || 0}
                      </p>
                      <Button
                        type="button"
                        className={`p-2 transition-all fadeIn`}
                        onClick={() => handleIncrease(item.id)}
                      >
                        <Plus size={20} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;

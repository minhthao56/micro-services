import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaBook } from "react-icons/fa"
import { ImCancelCircle } from "react-icons/im"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Chip,
  Tooltip
} from "@nextui-org/react";
import { PhoneBooking } from "schema/communicate/phone-booking";


import { getPhoneBookingList } from "../services/communicate/phone-booking";
import TwilioAudio from "../components/TwilioAudio";
import Loading from "../components/Loading";
import CreateBooking from "./CreateBooking";

export default function PhoneBookingPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getPhoneBookingList"],
    queryFn: async () =>
      await getPhoneBookingList({ limit: 10, page: 0, search: "" }),
  });

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const [phoneBooking, setPhoneBooking] = useState<PhoneBooking>();



  if (isPending) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex justify-between mb-6">
        <p className="text-xl">Management Phone Booking</p>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PHONE NUMBER</TableColumn>
          <TableColumn>START ADDRESS</TableColumn>
          <TableColumn>END ADDRESS</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {data.phone_booking ? (
            data.phone_booking.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.last_name + " " + item.first_name}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
                <TableCell>
                  <TwilioAudio url={item.start_recording_url} />
                </TableCell>
                <TableCell>
                  <TwilioAudio url={item.end_recording_url} />
                </TableCell>
                <TableCell>
                  <Chip
                    color={
                      item.status === "PENDING"
                        ? "warning"
                        : item.status === "COMPLETED"
                          ? "success"
                          : "danger"
                    }
                  >
                    {item.status}
                  </Chip>{" "}
                </TableCell>
                <TableCell>
                  <Tooltip content="Booking for customer">
                    <Button
                      onPress={() => {
                        onOpen();
                        const booking = data.phone_booking.find((booking) => {
                          return booking.call_sid === item.call_sid;
                        });
                        setPhoneBooking(booking);
                      }}
                      disabled={item.status !== "PENDING"}
                      isIconOnly
                      color="primary"
                    >
                      <FaBook />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Cancel booking">
                    <Button
                      disabled={item.status !== "PENDING"}
                      isIconOnly
                      className="ml-1"
                      color="danger"
                    >
                      <ImCancelCircle />
                    </Button>
                  </Tooltip>

                </TableCell>
              </TableRow>
            ))
          ) : (
            <div>No data</div>
          )}
        </TableBody>
      </Table>
      <CreateBooking
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        phoneBooking={phoneBooking}
      />
    </>
  );
}
